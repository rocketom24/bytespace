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

export function Slide({
  children,
  backdrop,
  className,
  innerClassName,
  id,
  label,
  depth = 1,
}: {
  children: React.ReactNode;
  backdrop?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  label?: string;
  depth?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const metrics = useRef({ start: 0, length: 1, viewport: 1 });
  const track = useScrollTrack();
  const reduceMotion = useReducedMotionSafe();
  const isDesktop = track?.isDesktop ?? false;
  const position = track?.position;
  const progress = useMotionValue(0.5);

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

  const shift = 110 * depth;
  const x = useTransform(progress, [0, 0.5, 1], [shift, 0, -shift]);
  const y = useTransform(progress, [0, 0.5, 1], [shift * 0.4, 0, -shift * 0.4]);
  const opacity = useTransform(progress, [0, 0.22, 0.78, 1], [0.15, 1, 1, 0.15]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.96, 1, 0.96]);

  const motionStyle = reduceMotion
    ? undefined
    : isDesktop
      ? { x, opacity, scale }
      : { y, opacity };

  return (
    <section
      ref={ref}
      id={id}
      data-slide={label ?? "Section"}
      className={cn(
        "relative flex w-full shrink-0 flex-col justify-center overflow-hidden px-[var(--gutter)] py-[var(--nav-space)] lg:h-dvh lg:w-screen",
        className,
      )}
    >
      <SlideProgressContext.Provider value={progress}>
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
      </SlideProgressContext.Provider>
    </section>
  );
}
