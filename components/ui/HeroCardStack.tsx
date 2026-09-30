"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { HeroCourseCard } from "@/components/ui/HeroCourseCard";
import { courses } from "@/data/courses";

const BACK_OFFSETS = [
  { rotate: 4, x: -22, y: -14, scale: 0.96 },
  { rotate: 8, x: -42, y: -26, scale: 0.91 },
];

export function HeroCardStack() {
  const [order, setOrder] = useState(courses.map((course) => course.id));
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(query.matches);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const cycle = (direction: 1 | -1 = 1) => {
    setOrder((prev) => {
      if (direction === 1) {
        const [first, ...rest] = prev;
        return [...rest, first];
      }
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, -1)];
    });
  };

  const orderedCourses = order
    .map((id) => courses.find((course) => course.id === id))
    .filter((course): course is (typeof courses)[number] => Boolean(course));
  const front = orderedCourses[0];

  return (
    <div className="relative z-10 flex w-full max-w-xs flex-col gap-4 lg:h-[clamp(20rem,48vh,27rem)] lg:w-[clamp(14rem,19vw,19rem)] lg:gap-0">
      {orderedCourses.map((course, index) => (
        <HeroCourseCard
          key={course.id}
          course={course}
          zIndex={30 - index * 10}
          isFront={index === 0}
          offset={index === 0 || !isDesktop ? undefined : BACK_OFFSETS[index - 1]}
          onSwiped={cycle}
        />
      ))}

      {front ? (
        <>
          <div className="pointer-events-none absolute -bottom-12 -left-10 z-40 hidden w-max flex-col items-start gap-0.5 rounded-2xl bg-surface p-3 shadow-lg shadow-ink/10 lg:flex">
            <span className="flex items-center gap-1 text-lead font-bold text-ink">
              <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
              {front.rating}
            </span>
            <span className="text-micro font-semibold uppercase tracking-wide text-ink-muted">
              Avg rating
            </span>
          </div>

          <div className="pointer-events-none absolute -bottom-10 -right-4 z-40 hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-micro font-semibold text-background shadow-lg shadow-ink/20 lg:flex">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {front.format === "Live" ? "Live cohort" : "New cohort"} · Enrolling now
          </div>

          <div className="absolute -top-12 -right-24 z-40 hidden items-center gap-1 rounded-full border border-ink/10 bg-surface p-1 shadow-md lg:flex">
            <button
              type="button"
              onClick={() => cycle(-1)}
              aria-label="Previous course"
              className="flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-soft/60 hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <span className="h-4 w-px bg-ink/10" aria-hidden />
            <button
              type="button"
              onClick={() => cycle(1)}
              aria-label="Next course"
              className="flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-soft/60 hover:text-ink"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
