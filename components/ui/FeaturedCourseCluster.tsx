"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { NotchedVideoCard } from "@/components/ui/NotchedVideoCard";
import { getPinWindow, useSlideProgress } from "@/components/layout/Slide";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { getCreatorById } from "@/lib/creators";
import { signedOffset } from "@/lib/deckGeometry";
import type { Course } from "@/data/courses";

/**
 * Centered stacked card deck (imagedeckpro.framer.website): each card's
 * `x`/`y`/`rotate`/`scale` is a plain linear function of its signed distance
 * `offset` from the front card - no shared pivot, no trig. `frontIndex` picks
 * which course sits centered; clicking a card behind the front one promotes
 * it, `offset` shifts for every card, and Framer Motion's spring tweens the
 * whole fan to its new shape on its own. Every card renders the full
 * `NotchedVideoCard` (not just an image peek) - spacing is wide enough that
 * neighbors' text never overlaps.
 */
// Percent-of-own-size steps (not px) so the fan scales with CARD_WIDTH
// instead of overflowing narrow viewports.
const X_STEP_PCT = 44;
const Y_STEP_PCT = 12;
const ANGLE_STEP_DEG = 9;
const SCALE_STEP = 0.06;
const CARD_WIDTH = "clamp(11rem,22vw,19rem)";
const REORDER_SPRING = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 } as const;

// This section pins in place (see Slide's `pinSpan`) for several extra
// viewport-widths/heights of scroll, so cards reveal one-by-one against a
// long scrubbed timeline instead of during the brief moment the slide would
// otherwise take to pass by. The reveal window sits inside Slide's settled
// (fully-opaque, non-drifting) plateau - see `getPinWindow` - with a small
// inset so it doesn't start/finish right at the pin's own enter/exit edges.
export const FEATURED_COURSES_PIN_SPAN = 4;
const { enter: PIN_ENTER, exitStart: PIN_EXIT } = getPinWindow(FEATURED_COURSES_PIN_SPAN);
const REVEAL_START = PIN_ENTER + 0.015;
const REVEAL_END = PIN_EXIT - 0.015;
// Low overlap keeps hand-offs distinct (one card settles before the next
// noticeably starts) rather than several fading in at once.
const REVEAL_OVERLAP = 1.3;
const REVEAL_SPRING = { stiffness: 220, damping: 32, mass: 0.6 } as const;

function DeckCard({
  course,
  index,
  count,
  offset,
  isFront,
  onPromote,
  reduceMotion,
  sectionProgress,
}: {
  course: Course;
  index: number;
  count: number;
  offset: number;
  isFront: boolean;
  onPromote: () => void;
  reduceMotion: boolean;
  sectionProgress: MotionValue<number>;
}) {
  const magnitude = Math.abs(offset);

  // Reduced motion: collapse the window to a no-op point (always resolves to
  // 1) instead of removing the style binding, since a motion value that
  // stops being read by `style` between renders freezes at its last value
  // rather than resetting.
  const span = REVEAL_END - REVEAL_START;
  const step = span / Math.max(count, 1);
  const revealStart = reduceMotion ? -1 : REVEAL_START + index * step;
  const revealEnd = reduceMotion ? -0.999 : Math.min(REVEAL_END, revealStart + step * REVEAL_OVERLAP);
  const rawReveal = useTransform(sectionProgress, [revealStart, revealEnd], [0, 1], {
    clamp: true,
  });
  const reveal = useSpring(rawReveal, REVEAL_SPRING);
  const revealY = useTransform(reveal, [0, 1], [30, 0]);
  const revealScale = useTransform(reveal, [0, 1], [0.92, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-0"
      style={{
        width: CARD_WIDTH,
        zIndex: 100 - Math.round(magnitude),
        opacity: reveal,
        y: revealY,
        scale: revealScale,
      }}
    >
      <motion.div
        animate={{
          x: `${offset * X_STEP_PCT - 50}%`,
          y: `${magnitude * Y_STEP_PCT}%`,
          rotate: offset * ANGLE_STEP_DEG,
          scale: Math.max(0.8, 1 - magnitude * SCALE_STEP),
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { ...REORDER_SPRING, delay: magnitude * 0.025 }
        }
        onClickCapture={(event) => {
          if (!isFront) {
            event.preventDefault();
            onPromote();
          }
        }}
      >
        <div className="rounded-[1.75rem] bg-surface p-3 shadow-xl shadow-ink/20 ring-1 ring-ink/5">
          <NotchedVideoCard course={course} creator={getCreatorById(course.creatorId)} compact />
        </div>
      </motion.div>
    </motion.div>
  );
}

const EXPLORE_CATEGORIES = [
  "Web Development",
  "Data Science",
  "Design",
  "Business",
  "Productivity",
  "Creative Arts",
  "Cooking",
];

function ExploreMore({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="mt-[clamp(1rem,3vh,1.75rem)] flex max-w-md flex-col items-center gap-[clamp(0.6rem,1.5vh,0.9rem)] text-center"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.1 }}
    >
      <p className="text-meta leading-relaxed text-ink-muted">
        <span className="font-semibold text-ink">There&apos;s always more to learn.</span>{" "}
        Explore thousands of courses across technology, creativity, business, and everyday life —
        from practical skills to ideas that can change your career and the way you see the world.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-micro text-ink-muted">
        {EXPLORE_CATEGORIES.map((label) => (
          <span key={label} className="rounded-full border border-ink/10 px-2.5 py-1">
            {label}
          </span>
        ))}
        <Link
          href="/courses"
          className="px-2.5 py-1 italic text-ink-muted/70 underline-offset-2 transition-colors hover:text-primary hover:underline"
        >
          + More
        </Link>
      </div>
    </motion.div>
  );
}

function SeeMoreLink() {
  return (
    <Link href="/courses" className="group flex w-fit items-center gap-5 sm:gap-6">
      <h2 className="text-[clamp(1.6rem,3.8vw,3.25rem)] font-bold leading-none text-ink transition-[color,transform] duration-300 ease-out group-hover:translate-x-1 group-hover:text-primary">
        See More Courses
      </h2>
      <span className="relative h-10 w-10 shrink-0 sm:h-14 sm:w-14">
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-primary text-background shadow-md shadow-ink/15 transition-[opacity,transform,border-radius] duration-500 ease-out group-hover:scale-[0.2] group-hover:rotate-120 group-hover:rounded-[38%] group-hover:opacity-0">
          <ArrowUpRight className="h-4.5 w-4.5 rotate-45 transition-transform duration-500 ease-out group-hover:rotate-90 sm:h-7 sm:w-7" aria-hidden />
        </span>
        <span className="absolute inset-0 flex scale-[0.2] rotate-[-120deg] items-center justify-center rounded-[38%] bg-ink text-background opacity-0 shadow-md shadow-ink/15 transition-[opacity,transform,border-radius] duration-500 ease-out group-hover:scale-100 group-hover:rotate-0 group-hover:rounded-full group-hover:opacity-100">
          <ArrowUpRight className="h-4.5 w-4.5 -rotate-45 transition-transform duration-500 ease-out group-hover:rotate-0 sm:h-7 sm:w-7" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

export function FeaturedCourseCluster({ courses }: { courses: Course[] }) {
  const [frontIndex, setFrontIndex] = useState(0);
  const reduceMotion = useReducedMotionSafe();
  const count = courses.length;

  const slideProgress = useSlideProgress();
  const fallbackProgress = useMotionValue(1);
  const sectionProgress = slideProgress ?? fallbackProgress;

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex w-full flex-1 items-center justify-center pt-[clamp(1rem,3vh,2rem)]">
        <div className="relative h-[clamp(25rem,48vh,31rem)] w-full max-w-5xl">
          {courses.map((course, index) => (
            <DeckCard
              key={course.id}
              course={course}
              index={index}
              count={count}
              offset={signedOffset(index, frontIndex, count)}
              isFront={index === frontIndex}
              onPromote={() => setFrontIndex(index)}
              reduceMotion={reduceMotion}
              sectionProgress={sectionProgress}
            />
          ))}
        </div>
      </div>

      <div className="-mt-[clamp(5rem,11vh,8rem)] flex flex-col items-center pb-[clamp(1.5rem,4vh,3rem)]">
        <SeeMoreLink />
        <ExploreMore reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}
