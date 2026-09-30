"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useScrollTrack } from "@/components/scroll/ScrollTrack";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/cn";

const SlideProgressContext = createContext<MotionValue<number> | null>(null);

export function useSlideProgress() {
  return useContext(SlideProgressContext);
}

// Default scroll dwell for non-pinned content slides: widens a slide's
// footprint (horizontal on desktop, vertical on mobile) so one scroll
// gesture settles into it instead of skipping straight through.
export const DEFAULT_PIN_SPAN = 1.4;

// Window (as a fraction of the slide's own 0->1 progress) during which the
// slide sits fully settled - opacity 1, no drift. Widening `pinSpan` stretches
// the slide's scroll footprint (extra vw on desktop / dvh on mobile) while a
// sticky inner wrapper keeps it glued to the viewport for that whole span, so
// the settled window below maps to a long, scrubbable hold instead of an
// instant. Callers that need this window to drive their own scroll-linked
// content (e.g. a one-by-one card reveal) import this rather than guessing.
export function getPinWindow(pinSpan: number) {
  if (pinSpan <= 1) return { enter: 0.22, exitStart: 0.78 };
  // Must match when the sticky wrapper actually engages/releases: it sticks
  // once the (pinSpan * viewport)-wide box has fully scrolled into view (one
  // viewport-unit in), and releases one viewport-unit before the box ends.
  return { enter: 1 / (pinSpan + 1), exitStart: pinSpan / (pinSpan + 1) };
}

export function Slide({
  children,
  backdrop,
  className,
  innerClassName,
  id,
  label,
  depth = 1,
  pinSpan = 1,
  mobilePinSpan = pinSpan,
}: {
  children: React.ReactNode;
  backdrop?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  label?: string;
  depth?: number;
  /** Extra viewport-widths of scroll (desktop) to hold this slide pinned/settled before it transitions out. */
  pinSpan?: number;
  /** Same, but for the mobile (viewport-heights) track. Defaults to `pinSpan`. */
  mobilePinSpan?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const metrics = useRef({ start: 0, length: 1, viewport: 1 });
  const track = useScrollTrack();
  const reduceMotion = useReducedMotionSafe();
  const isDesktop = track?.isDesktop ?? false;
  const position = track?.position;
  const progress = useMotionValue(0.5);
  const span = isDesktop ? pinSpan : mobilePinSpan;
  const isPinned = span > 1 && !reduceMotion;

  const sync = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    const viewport = isDesktop ? window.innerWidth : window.innerHeight;
    metrics.current = {
      start: isDesktop ? element.offsetLeft : element.offsetTop,
      length: isDesktop ? element.offsetWidth : element.offsetHeight,
      viewport,
    };
    const current = position?.get() ?? 0;
    const { start, length } = metrics.current;
    const value = (current + viewport - start) / (length + viewport);
    progress.set(Math.min(1, Math.max(0, value)));
  }, [isDesktop, position, progress]);

  useEffect(() => {
    sync();
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  useMotionValueEvent(position ?? progress, "change", (current: number) => {
    if (!position) return;
    const { start, length, viewport } = metrics.current;
    const value = (current + viewport - start) / (length + viewport);
    progress.set(Math.min(1, Math.max(0, value)));
  });

  const { enter, exitStart } = getPinWindow(isPinned ? span : 1);
  const shift = 110 * depth;
  const xInput = isPinned ? [0, enter, exitStart, 1] : [0, 0.5, 1];
  const x = useTransform(progress, xInput, isPinned ? [shift, 0, 0, -shift] : [shift, 0, -shift]);
  const y = useTransform(
    progress,
    xInput,
    isPinned ? [shift * 0.4, 0, 0, -shift * 0.4] : [shift * 0.4, 0, -shift * 0.4],
  );
  const opacity = useTransform(progress, [0, enter, exitStart, 1], [0.15, 1, 1, 0.15]);
  const scale = useTransform(progress, xInput, isPinned ? [0.96, 1, 1, 0.96] : [0.96, 1, 0.96]);

  const motionStyle = reduceMotion
    ? undefined
    : isDesktop
      ? { x, opacity, scale }
      : { y, opacity };

  const outerStyle: React.CSSProperties | undefined = isPinned
    ? isDesktop
      ? { width: `${span * 100}vw` }
      : { height: `${span * 100}dvh` }
    : undefined;

  return (
    <section
      ref={ref}
      id={id}
      data-slide={label ?? "Section"}
      className={cn("relative w-full shrink-0 lg:w-screen", className)}
      style={outerStyle}
    >
      <SlideProgressContext.Provider value={progress}>
        <div
          className={cn(
            "relative flex w-full flex-col justify-center overflow-hidden px-[var(--gutter)] py-[var(--nav-space)] lg:h-dvh lg:w-screen",
            isPinned && (isDesktop ? "sticky left-0 top-0" : "sticky top-0 h-dvh"),
          )}
        >
          <div
            aria-hidden
            className="absolute inset-0 z-0"
            style={{
              WebkitMaskImage: isDesktop
                ? "linear-gradient(to right, transparent, black var(--gutter), black calc(100% - var(--gutter)), transparent)"
                : "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
              maskImage: isDesktop
                ? "linear-gradient(to right, transparent, black var(--gutter), black calc(100% - var(--gutter)), transparent)"
                : "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
            }}
          >
            {backdrop}
          </div>
          <motion.div
            style={motionStyle}
            className={cn("flex h-full min-h-0 w-full flex-col justify-center", innerClassName)}
          >
            {children}
          </motion.div>
        </div>
      </SlideProgressContext.Provider>
    </section>
  );
}
