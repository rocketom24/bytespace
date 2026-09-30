import { Play } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Course } from "@/data/courses";
import { FALLBACK_GRADIENT, GRADIENTS_BY_COURSE_ID, ReactBlocksScene, SCENES_BY_COURSE_ID } from "@/components/ui/thumbnails/scenes";

/**
 * Decorative, responsive thumbnail illustration for a course/video card.
 * Fills its positioned parent (use inside a `relative overflow-hidden`
 * container) - purely presentational, so it's `aria-hidden`.
 */
export function CourseThumbnail({
  course,
  className,
  showPlay: showPlayProp = true,
}: {
  course: Course;
  className?: string;
  /** Set false when the parent card already renders its own play affordance. */
  showPlay?: boolean;
}) {
  const Scene = SCENES_BY_COURSE_ID[course.id] ?? ReactBlocksScene;
  const [from, to] = GRADIENTS_BY_COURSE_ID[course.id] ?? FALLBACK_GRADIENT;
  const gradientId = `cover-gradient-${course.id}`;
  const showPlay = showPlayProp && course.format !== "Text";

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden>
      <svg viewBox="0 0 400 267" preserveAspectRatio="xMidYMid slice" className="h-full w-full" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width={400} height={267} fill={`url(#${gradientId})`} />
        <Scene />
      </svg>
      {showPlay && (
        <span
          className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 shadow-md shadow-ink/15 sm:h-11 sm:w-11"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <Play className="h-3.5 w-3.5 translate-x-0.5 fill-ink text-ink sm:h-4 sm:w-4" aria-hidden />
        </span>
      )}
    </div>
  );
}
