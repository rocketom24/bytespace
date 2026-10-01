"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Search, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { categoryIconMap } from "@/components/ui/CategoryPill";
import { categories } from "@/data/categories";
import { courses, type Course } from "@/data/courses";
import { getCreatorById } from "@/lib/creators";

type Shortcut = {
  label: string;
  icon: LucideIcon;
  href: string;
};

const shortcuts: Shortcut[] = categories.slice(0, 4).map((category) => ({
  label: category.name,
  icon: categoryIconMap[category.icon],
  href: "/courses",
}));

function categoryIconFor(categoryName: string) {
  const match = categories.find((category) => category.name === categoryName);
  return match ? categoryIconMap[match.icon] : Search;
}

function matchingCourses(query: string): Course[] {
  const value = query.trim().toLowerCase();
  if (!value) return [];
  return courses
    .filter((course) =>
      [course.title, course.summary, course.category].some((field) =>
        field.toLowerCase().includes(value)
      )
    )
    .slice(0, 8);
}

function ShortcutButton({ icon: Icon, href, label }: Shortcut) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1.5 rounded-2xl px-2 py-2 opacity-50 transition-opacity duration-200 hover:opacity-100"
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-soft/50">
        <Icon className="size-5" aria-hidden />
      </div>
      <span className="text-[11px] font-medium text-ink-muted">{label}</span>
    </Link>
  );
}

function SpotlightPlaceholder({ text, className }: { text: string; className?: string }) {
  return (
    <motion.div
      layout
      className={cn("pointer-events-none absolute z-10 flex items-center text-ink-muted", className)}
    >
      <AnimatePresence mode="popLayout">
        <motion.p
          layoutId={`hero-search-placeholder-${text}`}
          key={`hero-search-placeholder-${text}`}
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

function SpotlightInput({
  open,
  placeholder,
  hidePlaceholder,
  value,
  onChange,
  onFocus,
  onSubmit,
  placeholderClassName,
}: {
  open: boolean;
  placeholder: string;
  hidePlaceholder: boolean;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onSubmit?: () => void;
  placeholderClassName?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div className="flex h-16 w-full items-center justify-start gap-3 px-5">
      <motion.div layout className="text-primary">
        {onSubmit ? (
          <button type="button" onClick={onSubmit} aria-label="Search" className="flex">
            <Search className="h-5 w-5 shrink-0" aria-hidden />
          </button>
        ) : (
          <Search className="h-5 w-5 shrink-0" aria-hidden />
        )}
      </motion.div>
      <div className="relative flex-1 text-lead">
        {!hidePlaceholder && (
          <SpotlightPlaceholder text={placeholder} className={placeholderClassName} />
        )}
        <motion.input
          ref={inputRef}
          layout="position"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSubmit?.();
            }
          }}
          className="w-full bg-transparent text-ink outline-none"
        />
      </div>
    </div>
  );
}

function SearchResultCard({ course, isLast }: { course: Course; isLast: boolean }) {
  const Icon = categoryIconFor(course.category);
  const creator = getCreatorById(course.creatorId);
  return (
    <Link href={`/course/${course.id}`} className="group/card w-full overflow-hidden">
      <div
        className={cn(
          "flex w-full items-center justify-start gap-3 rounded-xl px-2 py-2 text-ink hover:bg-surface hover:shadow-md",
          isLast && "rounded-b-3xl"
        )}
      >
        <div className="flex size-8 aspect-square items-center justify-center">
          <Icon className="size-5" aria-hidden />
        </div>
        <div className="flex flex-col">
          <p className="text-meta font-medium">{course.title}</p>
          <p className="text-xs text-ink-muted">
            {creator ? creator.name : course.category} · {course.level}
          </p>
        </div>
        <div className="flex flex-1 items-center justify-end opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
          <ChevronRight className="size-5" aria-hidden />
        </div>
      </div>
    </Link>
  );
}

function SearchResultsContainer({
  results,
  onHover,
}: {
  results: Course[];
  onHover: (index: number | null) => void;
}) {
  return (
    <div onMouseLeave={() => onHover(null)} data-lenis-prevent className="flex max-h-80 w-full flex-col overflow-y-auto p-2">
      {results.length === 0 && (
        <p className="px-2 py-3 text-meta text-ink-muted">No courses match your search.</p>
      )}
      {results.map((course, index) => (
        <motion.div
          key={course.id}
          onMouseEnter={() => onHover(index)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2, ease: "easeOut" }}
        >
          <SearchResultCard course={course} isLast={index === results.length - 1} />
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSearchSpotlight({ onSubmit }: { onSubmit?: (query: string) => void } = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hoveredResult, setHoveredResult] = useState<number | null>(null);
  const [hoveredShortcut, setHoveredShortcut] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSearchValue("");
    setHoveredResult(null);
    setHoveredShortcut(null);
  };

  const handleSubmit = () => {
    const value = searchValue.trim();
    if (!value) return;
    onSubmit?.(value);
    setOpen(false);
    setHoveredResult(null);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    const onClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const results = matchingCourses(searchValue);

  return (
    <div ref={wrapperRef} className="relative z-20 w-full max-w-md">
      <motion.div
        layout="position"
        transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.25 } }}
        className={cn(
          "relative z-10 flex w-full items-center overflow-hidden rounded-full border-2 border-primary bg-surface shadow-lg shadow-primary/30 transition-colors duration-300",
          !open && "hover:shadow-xl"
        )}
        onClick={() => !open && setOpen(true)}
      >
        {!open && (
          <span
            aria-hidden
            className="animate-search-glow pointer-events-none absolute inset-0 rounded-full border-2 border-primary"
          />
        )}
        <SpotlightInput
          open={open}
          placeholder={
            hoveredShortcut !== null
              ? shortcuts[hoveredShortcut].label
              : hoveredResult !== null
                ? results[hoveredResult].title
                : "Search courses, topics, creators…"
          }
          placeholderClassName={hoveredResult !== null ? "text-ink bg-surface" : "text-ink-muted"}
          hidePlaceholder={!(hoveredResult !== null || !searchValue)}
          value={searchValue}
          onChange={setSearchValue}
          onFocus={() => setOpen(true)}
          onSubmit={onSubmit ? handleSubmit : undefined}
        />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-0 overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-xl shadow-primary/20"
          >
            <AnimatePresence mode="popLayout">
              {!searchValue ? (
                <motion.div
                  key="shortcuts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  onMouseLeave={() => setHoveredShortcut(null)}
                  className="flex w-full items-center justify-around px-2 py-3"
                >
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={shortcut.label}
                      onMouseEnter={() => setHoveredShortcut(index)}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.4, type: "spring", bounce: 0.3, delay: index * 0.05 }}
                    >
                      <ShortcutButton {...shortcut} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <SearchResultsContainer key="results" results={results} onHover={setHoveredResult} />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
