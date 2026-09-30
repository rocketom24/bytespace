"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { Course } from "@/data/courses";

export function CourseList({ courses }: { courses: Course[] }) {
  const reduceMotion = useReducedMotionSafe();

  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <motion.li
          key={course.id}
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          <Link
            href={`/course/${course.id}`}
            className="group flex h-full items-center justify-between gap-3 rounded-2xl border-l-[3px] border-accent bg-surface px-[clamp(1rem,1.4vw,1.5rem)] py-[clamp(0.6rem,1.4vh,1rem)] transition-colors duration-300 hover:bg-ink/95"
          >
            <span className="text-meta font-semibold text-ink transition-colors duration-300 group-hover:text-background">
              {course.title}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-colors duration-300 group-hover:text-background" aria-hidden />
          </Link>
        </motion.li>
      ))}
    </ol>
  );
}
