"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import Lenis from "lenis";
import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type TrackValue = {
  containerRef: RefObject<HTMLDivElement | null>;
  isDesktop: boolean;
  progress: MotionValue<number>;
  position: MotionValue<number>;
};

const TrackContext = createContext<TrackValue | null>(null);

export function useScrollTrack() {
  return useContext(TrackContext);
}

type Section = { id: string; label: string; offset: number };

export function ScrollTrack({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const progress = useMotionValue(0);
  const position = useMotionValue(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(query.matches);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = isDesktop
      ? new Lenis({
          wrapper,
          content,
          orientation: "horizontal",
          gestureOrientation: "both",
          lerp: 0.065,
          wheelMultiplier: 0.85,
          touchMultiplier: 1.6,
          syncTouch: true,
          smoothWheel: !reduceMotion,
        })
      : new Lenis({ lerp: 0.075, wheelMultiplier: 0.85, smoothWheel: !reduceMotion });

    lenisRef.current = lenis;

    const onScroll = ({ progress: value, scroll }: { progress: number; scroll: number }) => {
      progress.set(Number.isFinite(value) ? value : 0);
      position.set(Number.isFinite(scroll) ? scroll : 0);
    };
    lenis.on("scroll", onScroll);

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      progress.set(0);
      position.set(0);
    };
  }, [isDesktop, progress, position, reduceMotion]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const measure = () => {
      const nodes = Array.from(content.querySelectorAll<HTMLElement>("[data-slide]"));
      setSections(
        nodes.map((node, index) => ({
          id: node.id || `slide-${index}`,
          label: node.dataset.slide || `Section ${index + 1}`,
          offset: isDesktop ? node.offsetLeft : node.offsetTop,
        })),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [isDesktop, children]);

  const updateActive = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || sections.length === 0) return;
    const position = isDesktop ? wrapper.scrollLeft : window.scrollY;
    const size = isDesktop ? wrapper.clientWidth : window.innerHeight;
    const center = position + size / 2;
    let index = 0;
    sections.forEach((section, i) => {
      if (center >= section.offset) index = i;
    });
    setActive(index);
  }, [isDesktop, sections]);

  useMotionValueEvent(progress, "change", updateActive);
  useEffect(updateActive, [updateActive]);

  useEffect(() => {
    if (sections.length === 0) return;
    const jumpToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target = document.getElementById(hash);
      if (target) lenisRef.current?.scrollTo(target, { offset: 0 });
    };
    const timer = window.setTimeout(jumpToHash, 120);
    window.addEventListener("hashchange", jumpToHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", jumpToHash);
    };
  }, [sections]);

  const goTo = useCallback(
    (section: Section) => {
      lenisRef.current?.scrollTo(section.offset, { duration: reduceMotion ? 0 : 1.4 });
    },
    [reduceMotion],
  );

  useEffect(() => {
    if (sections.length === 0) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      let delta = 0;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") delta = 1;
      else if (event.key === "ArrowUp" || event.key === "ArrowLeft") delta = -1;
      else return;

      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
      }

      const next = Math.min(sections.length - 1, Math.max(0, active + delta));
      if (next === active) return;
      event.preventDefault();
      goTo(sections[next]);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDesktop, sections, active, goTo]);

  const driftX = useTransform(progress, [0, 1], ["0vw", "-14vw"]);
  const driftY = useTransform(progress, [0, 1], ["0vh", "-6vh"]);
  const drift = useMemo(
    () => (isDesktop ? { x: driftX } : { y: driftY }),
    [isDesktop, driftX, driftY],
  );

  return (
    <TrackContext.Provider value={{ containerRef: wrapperRef, isDesktop, progress, position }}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      >
        <motion.div
          className="absolute -inset-x-[20%] inset-y-0"
          style={{
            ...(reduceMotion ? undefined : drift),
            background:
              "radial-gradient(ellipse 34% 46% at 8% 22%, color-mix(in srgb, var(--soft) 42%, transparent), transparent 66%)," +
              "radial-gradient(ellipse 30% 40% at 46% 88%, color-mix(in srgb, var(--secondary) 30%, transparent), transparent 68%)," +
              "radial-gradient(ellipse 36% 48% at 78% 16%, color-mix(in srgb, var(--primary) 24%, transparent), transparent 66%)," +
              "radial-gradient(ellipse 30% 44% at 96% 78%, color-mix(in srgb, var(--soft) 38%, transparent), transparent 68%)",
          }}
        />
      </div>

      <div
        ref={wrapperRef}
        className={isDesktop ? "h-dvh w-screen overflow-hidden" : ""}
      >
        <div
          ref={contentRef}
          key={isDesktop ? "track" : "stack"}
          className={isDesktop ? "flex h-dvh w-max flex-row" : "flex flex-col"}
        >
          {children}
        </div>
      </div>

      {sections.length > 1 && (
        <nav
          aria-label="Sections"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden items-center gap-6 px-6 py-4 lg:flex"
        >
          <div className="pointer-events-auto flex shrink-0 items-baseline gap-1.5">
            <span className="text-micro font-bold tabular-nums text-ink">
              {String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              You are here
            </span>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => goTo(section)}
                aria-current={index === active}
                className="pointer-events-auto flex-1 truncate border-t-2 pt-1.5 text-left text-micro font-semibold uppercase tracking-wide outline-none transition-colors"
                style={{
                  borderColor: index === active ? "var(--accent)" : "color-mix(in srgb, var(--ink) 12%, transparent)",
                  color: index === active ? "var(--ink)" : "var(--ink-muted)",
                }}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="pointer-events-auto flex shrink-0 items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              Drag to explore
            </span>
            <button
              type="button"
              onClick={() => goTo(sections[Math.min(active + 1, sections.length - 1)])}
              aria-label="Next section"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-background transition-transform hover:scale-105"
            >
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </nav>
      )}
    </TrackContext.Provider>
  );
}
