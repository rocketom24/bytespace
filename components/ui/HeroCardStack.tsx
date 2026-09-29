"use client";

import { useEffect, useState } from "react";
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

  const cycle = () => {
    setOrder((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const orderedCourses = order
    .map((id) => courses.find((course) => course.id === id))
    .filter((course): course is (typeof courses)[number] => Boolean(course));

  return (
    <div className="relative z-10 flex w-full max-w-xs flex-col gap-4 lg:h-[clamp(20rem,58vh,34rem)] lg:w-[clamp(14rem,19vw,19rem)] lg:gap-0">
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
    </div>
  );
}
