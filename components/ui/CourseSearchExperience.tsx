"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NotchedVideoCard } from "@/components/ui/NotchedVideoCard";
import { HeroSearchSpotlight } from "@/components/ui/HeroSearchSpotlight";
import { getCreatorById } from "@/lib/creators";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { fadeInProps } from "@/lib/motion";
import {
  CourseFilterButton,
  EMPTY_FILTERS,
  applyCourseFilters,
  hasActiveFilters,
  type CourseFilters,
} from "@/components/ui/CourseFilterPanel";
import type { Course } from "@/data/courses";
import type { Category } from "@/data/categories";

export function CourseSearchExperience({
  courses,
  categories,
}: {
  courses: Course[];
  categories: Category[];
}) {
  const [filters, setFilters] = useState<CourseFilters>(EMPTY_FILTERS);
  const filtered = applyCourseFilters(courses, filters);
  const active = hasActiveFilters(filters);
  const reduceMotion = useReducedMotionSafe();

  return (
    <section className="relative w-full overflow-hidden px-[var(--gutter)] pb-[var(--block)] pt-[var(--nav-space)]">
      <div aria-hidden className="absolute inset-0 z-0">
        <SectionDoodles seed={13} density="light" accentWeight={0.4} />
      </div>

      <Container width="wide" className="relative z-10 flex flex-col gap-[var(--block)]">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-display font-bold text-ink">All courses</h1>
          <p className="max-w-[52ch] text-lead text-ink-muted">
            Search or filter the entire catalog to find exactly what you need.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-xl items-center gap-3">
          <HeroSearchSpotlight />
          <CourseFilterButton categories={categories} filters={filters} onApply={setFilters} />
        </div>

        {active && (
          <div className="mx-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="flex items-center gap-1 text-meta font-medium text-accent hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              Clear filters
            </button>
          </div>
        )}

        <motion.div key={JSON.stringify(filters)} {...fadeInProps(reduceMotion)}>
          {filtered.length > 0 ? (
            <div className="grid w-full grid-cols-1 gap-[clamp(0.75rem,1.6vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((course) => (
                <NotchedVideoCard key={course.id} course={course} creator={getCreatorById(course.creatorId)} accent />
              ))}
            </div>
          ) : (
            <p className="text-center text-lead text-ink-muted">No courses match your filters.</p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
