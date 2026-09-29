"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { panelVariants, PRESS_INTERACTIVE } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { Course, CourseFormat } from "@/data/courses";
import type { Category } from "@/data/categories";
import { creators } from "@/data/creators";

export type CourseFilters = {
  category: string | null;
  level: Course["level"] | null;
  duration: "under3" | "3to6" | "6plus" | null;
  price: "free" | "under50" | "50to100" | "100plus" | null;
  minRating: number | null;
  format: CourseFormat | null;
  language: string | null;
  creatorId: string | null;
};

export const EMPTY_FILTERS: CourseFilters = {
  category: null,
  level: null,
  duration: null,
  price: null,
  minRating: null,
  format: null,
  language: null,
  creatorId: null,
};

export function hasActiveFilters(filters: CourseFilters) {
  return Object.values(filters).some((value) => value !== null);
}

export function applyCourseFilters(courses: Course[], filters: CourseFilters): Course[] {
  return courses.filter((course) => {
    if (filters.category && course.category !== filters.category) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.format && course.format !== filters.format) return false;
    if (filters.language && course.language !== filters.language) return false;
    if (filters.creatorId && course.creatorId !== filters.creatorId) return false;
    if (filters.minRating && course.rating < filters.minRating) return false;

    if (filters.duration) {
      const hours = course.durationMinutes / 60;
      if (filters.duration === "under3" && hours >= 3) return false;
      if (filters.duration === "3to6" && (hours < 3 || hours > 6)) return false;
      if (filters.duration === "6plus" && hours <= 6) return false;
    }

    if (filters.price) {
      if (filters.price === "free" && course.price !== 0) return false;
      if (filters.price === "under50" && !(course.price > 0 && course.price < 50)) return false;
      if (filters.price === "50to100" && !(course.price >= 50 && course.price <= 100)) return false;
      if (filters.price === "100plus" && course.price <= 100) return false;
    }

    return true;
  });
}

const LEVELS: Course["level"][] = ["Beginner", "Intermediate", "Advanced"];
const FORMATS: CourseFormat[] = ["Video", "Live", "Text"];
const LANGUAGES = ["English", "Spanish", "French"];
const DURATIONS: { id: NonNullable<CourseFilters["duration"]>; label: string }[] = [
  { id: "under3", label: "Under 3h" },
  { id: "3to6", label: "3–6h" },
  { id: "6plus", label: "6h+" },
];
const PRICES: { id: NonNullable<CourseFilters["price"]>; label: string }[] = [
  { id: "free", label: "Free" },
  { id: "under50", label: "Under $50" },
  { id: "50to100", label: "$50–$100" },
  { id: "100plus", label: "$100+" },
];
const RATINGS = [4.5, 4.0];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-micro font-medium transition-colors duration-200",
        active
          ? "border-primary bg-primary text-background"
          : "border-ink/10 bg-surface text-ink-muted hover:border-primary/50 hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-micro font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function CourseFilterButton({
  categories,
  filters,
  onApply,
}: {
  categories: Category[];
  filters: CourseFilters;
  onApply: (filters: CourseFilters) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<CourseFilters>(filters);
  const [placement, setPlacement] = useState({ openUpward: false, maxHeight: 420 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const active = hasActiveFilters(filters);
  const reduceMotion = useReducedMotionSafe();
  const variants = panelVariants(reduceMotion);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const margin = 16;
    const minDownward = 320;
    const compute = () => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      const spaceBelow = window.innerHeight - rect.bottom - margin;
      const spaceAbove = rect.top - margin;
      const openUpward = spaceBelow < minDownward && spaceAbove > spaceBelow;
      const available = openUpward ? spaceAbove : spaceBelow;
      setPlacement({ openUpward, maxHeight: Math.max(160, Math.min(available, window.innerHeight * 0.7)) });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [open]);

  const toggle = <K extends keyof CourseFilters>(key: K, value: CourseFilters[K]) => {
    setDraft((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }));
  };

  return (
    <div ref={wrapperRef} className="relative z-20 shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Filter courses"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border-2 bg-surface shadow-lg sm:h-16 sm:w-16",
          PRESS_INTERACTIVE,
          active || open ? "border-primary text-primary" : "border-ink/10 text-ink-muted hover:border-primary/50"
        )}
      >
        <SlidersHorizontal className="h-5 w-5" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="absolute right-0 z-30 flex w-[min(90vw,26rem)] flex-col gap-4 overflow-y-auto rounded-3xl border border-ink/10 bg-surface p-4 shadow-xl shadow-primary/20"
            style={{
              maxHeight: placement.maxHeight,
              ...(placement.openUpward
                ? { bottom: "calc(100% + 0.5rem)" }
                : { top: "calc(100% + 0.5rem)" }),
            }}
          >
          <FilterGroup label="Category">
            {categories.map((category) => (
              <Chip
                key={category.id}
                active={draft.category === category.name}
                onClick={() => toggle("category", category.name)}
              >
                {category.name}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Level">
            {LEVELS.map((level) => (
              <Chip key={level} active={draft.level === level} onClick={() => toggle("level", level)}>
                {level}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Duration">
            {DURATIONS.map((duration) => (
              <Chip
                key={duration.id}
                active={draft.duration === duration.id}
                onClick={() => toggle("duration", duration.id)}
              >
                {duration.label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Price">
            {PRICES.map((price) => (
              <Chip key={price.id} active={draft.price === price.id} onClick={() => toggle("price", price.id)}>
                {price.label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Rating">
            {RATINGS.map((rating) => (
              <Chip
                key={rating}
                active={draft.minRating === rating}
                onClick={() => toggle("minRating", rating)}
              >
                {rating.toFixed(1)}+
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Format">
            {FORMATS.map((format) => (
              <Chip key={format} active={draft.format === format} onClick={() => toggle("format", format)}>
                {format}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Language">
            {LANGUAGES.map((language) => (
              <Chip
                key={language}
                active={draft.language === language}
                onClick={() => toggle("language", language)}
              >
                {language}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Creator">
            {creators.map((creator) => (
              <Chip
                key={creator.id}
                active={draft.creatorId === creator.id}
                onClick={() => toggle("creatorId", creator.id)}
              >
                {creator.name}
              </Chip>
            ))}
          </FilterGroup>

          <div className="flex items-center justify-between gap-2 border-t border-ink/10 pt-3">
            <button
              type="button"
              onClick={() => {
                setDraft(EMPTY_FILTERS);
                onApply(EMPTY_FILTERS);
                setOpen(false);
              }}
              className="text-meta font-medium text-ink-muted hover:text-ink"
            >
              Clear filters
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                setOpen(false);
              }}
              className="rounded-full bg-primary px-4 py-2 text-meta font-semibold text-background hover:bg-ink"
            >
              Apply filters
            </button>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
