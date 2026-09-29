"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { SearchX, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { CatMascot } from "@/components/ui/CatMascot";
import { NotchedVideoCard } from "@/components/ui/NotchedVideoCard";
import { HeroSearchSpotlight } from "@/components/ui/HeroSearchSpotlight";
import { getCreatorById } from "@/lib/creators";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { fadeInProps } from "@/lib/motion";
import { COURSE_SORT_OPTIONS, searchCourses, sortCourses, type CourseSort } from "@/lib/courses";
import {
  CourseFilterButton,
  EMPTY_FILTERS,
  applyCourseFilters,
  hasActiveFilters,
  type CourseFilters,
} from "@/components/ui/CourseFilterPanel";
import type { Course } from "@/data/courses";
import type { Category } from "@/data/categories";

export function CoursesExperience({
  courses,
  categories,
}: {
  courses: Course[];
  categories: Category[];
}) {
  const [filters, setFilters] = useState<CourseFilters>(EMPTY_FILTERS);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<CourseSort>("relevance");
  const [searchKey, setSearchKey] = useState(0);
  const active = hasActiveFilters(filters);
  const isSearching = query.length > 0;
  const reduceMotion = useReducedMotionSafe();

  const suggested = applyCourseFilters(courses, filters).slice(0, 6);
  const results = sortCourses(applyCourseFilters(searchCourses(courses, query), filters), sort);

  const clearSearch = () => {
    setQuery("");
    setSort("relevance");
    setSearchKey((value) => value + 1);
  };

  return (
    <section className="relative flex w-full flex-col overflow-x-hidden px-[var(--gutter)] py-[var(--nav-space)] lg:min-h-dvh lg:justify-center">
      <div aria-hidden className="absolute inset-0 z-0">
        <SectionDoodles seed={11} density="medium" />
      </div>

      <Container width="wide" className="relative z-10 flex flex-col items-center gap-[clamp(1.25rem,2.4vh,2rem)]">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="max-w-[22ch] text-title font-bold text-ink sm:text-display">
            Find the course that gets you unstuck
          </h1>
          <p className="max-w-[52ch] text-meta text-ink-muted sm:text-lead">
            Search by name or filter by category, level, price, and more.
          </p>
        </div>

        <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:items-end">
          <CatMascot className="sm:mb-1" />
          <div className="flex w-full items-center gap-3 sm:w-auto sm:flex-1">
            <HeroSearchSpotlight key={searchKey} onSubmit={setQuery} />
            <CourseFilterButton categories={categories} filters={filters} onApply={setFilters} />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[clamp(1rem,2vh,1.5rem)]">
          <motion.div
            key={isSearching ? "results" : "suggested"}
            {...fadeInProps(reduceMotion)}
            className="flex w-full flex-col items-center gap-[clamp(1rem,2vh,1.5rem)]"
          >
          {isSearching ? (
            <>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
                <p className="text-lead text-ink">
                  Results for <span className="font-semibold">&ldquo;{query}&rdquo;</span>
                </p>
                <span className="text-meta text-ink-muted">
                  · {results.length} {results.length === 1 ? "result" : "results"}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {active && (
                  <button
                    type="button"
                    onClick={() => setFilters(EMPTY_FILTERS)}
                    className="flex items-center gap-1 text-meta font-medium text-primary hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden />
                    Clear filters
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearSearch}
                  className="flex items-center gap-1 text-meta font-medium text-ink-muted hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                  Clear search
                </button>
                <label className="flex items-center gap-1.5 text-meta text-ink-muted">
                  Sort
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as CourseSort)}
                    className="rounded-full border border-ink/10 bg-surface px-3 py-1.5 text-meta font-medium text-ink outline-none"
                  >
                    {COURSE_SORT_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {results.length > 0 ? (
                <div className="grid w-full max-w-[min(100%,68rem)] grid-cols-1 gap-[clamp(0.75rem,1.6vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((course) => (
                    <NotchedVideoCard key={course.id} course={course} creator={getCreatorById(course.creatorId)} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-6 text-center">
                  <SearchX className="h-8 w-8 text-ink-muted" aria-hidden />
                  <p className="text-lead text-ink-muted">
                    No courses match &ldquo;{query}&rdquo;. Try a different search or clear your filters.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {active && (
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="flex items-center gap-1 text-meta font-medium text-primary hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                  Clear filters
                </button>
              )}

              {suggested.length > 0 ? (
                <div className="grid w-full max-w-[min(100%,52rem)] grid-cols-2 gap-[clamp(0.6rem,1.2vw,1rem)] sm:grid-cols-3">
                  {suggested.map((course) => (
                    <NotchedVideoCard key={course.id} course={course} creator={getCreatorById(course.creatorId)} compact />
                  ))}
                </div>
              ) : (
                <p className="text-lead text-ink-muted">No courses match your filters yet.</p>
              )}
            </>
          )}
          </motion.div>

          <Button href="/courses/all" variant="outline">
            View All Courses
          </Button>
        </div>
      </Container>
    </section>
  );
}
