"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { NotchedVideoCard } from "@/components/ui/NotchedVideoCard";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { getCreatorById } from "@/lib/creators";
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

function signedOffset(index: number, frontIndex: number, count: number) {
  const raw = index - frontIndex;
  return ((raw + count / 2) % count + count) % count - count / 2;
}

function DeckCard({
  course,
  offset,
  isFront,
  onPromote,
  reduceMotion,
}: {
  course: Course;
  offset: number;
  isFront: boolean;
  onPromote: () => void;
  reduceMotion: boolean;
}) {
  const magnitude = Math.abs(offset);
  return (
    <motion.div
      className="absolute left-1/2 top-0"
      style={{ width: CARD_WIDTH }}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{
        x: `${offset * X_STEP_PCT - 50}%`,
        y: `${magnitude * Y_STEP_PCT}%`,
        rotate: offset * ANGLE_STEP_DEG,
        scale: Math.max(0.8, 1 - magnitude * SCALE_STEP),
        zIndex: 100 - Math.round(magnitude),
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

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex w-full flex-1 items-center justify-center pt-[clamp(1rem,3vh,2rem)]">
        <div className="relative h-[clamp(25rem,48vh,31rem)] w-full max-w-5xl">
          {courses.map((course, index) => (
            <DeckCard
              key={course.id}
              course={course}
              offset={signedOffset(index, frontIndex, count)}
              isFront={index === frontIndex}
              onPromote={() => setFrontIndex(index)}
              reduceMotion={reduceMotion}
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
