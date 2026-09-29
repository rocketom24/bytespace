import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { PRESS_INTERACTIVE } from "@/lib/motion";
import type { Course } from "@/data/courses";
import type { Creator } from "@/data/creators";

const DISC = 36;
const BLOCK = 46;
const FILLET = 14;

export function NotchedVideoCard({
  course,
  creator,
  compact,
  className,
}: {
  course: Course;
  creator?: Creator;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/course/${course.id}`}
      className={cn("group flex h-full flex-col gap-2", PRESS_INTERACTIVE, className)}
    >
      <div className="relative">
        <ViewTransition name={`course-cover-${course.id}`} share="auto" default="none">
          <div
            className="relative aspect-3/2 overflow-hidden rounded-3xl ring-1 ring-inset ring-ink/10 transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ backgroundColor: course.coverColor }}
          >
            <Badge className="absolute left-2.5 top-2.5 bg-surface/80 text-ink">
              {course.price === 0 ? "Free" : "Premium"}
            </Badge>
          </div>
        </ViewTransition>

        <div
          aria-hidden
          className="absolute bottom-0 right-0 bg-background"
          style={{ width: BLOCK, height: BLOCK, borderTopLeftRadius: BLOCK - DISC / 2 }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, var(--background) ${FILLET}px)`,
            }}
          />
        ))}

        <span
          aria-hidden
          className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-primary text-background shadow-md shadow-ink/15 transition-[scale,background-color] duration-300 group-hover:scale-105 group-hover:bg-ink"
          style={{ width: DISC, height: DISC }}
        >
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-soft text-[0.6rem] font-semibold text-ink">
          {creator?.name.charAt(0) ?? "?"}
        </span>
        <span className="truncate text-micro text-ink-muted">{creator?.name}</span>
      </div>

      <h3 className="line-clamp-2 text-meta font-semibold text-ink sm:text-subtitle">{course.title}</h3>

      {!compact && <p className="line-clamp-2 text-micro text-ink-muted">{course.summary}</p>}

      <div className="flex flex-wrap gap-1.5">
        <Badge>{course.category}</Badge>
        <Badge>{course.level}</Badge>
      </div>

      <div className="mt-auto flex items-center justify-between text-micro text-ink-muted">
        <span className="flex items-center gap-1 font-semibold text-ink">
          <Star className="h-3 w-3 fill-current text-primary" aria-hidden />
          {course.rating}
          <span className="font-normal text-ink-muted">({course.commentCount})</span>
        </span>
        <span>{Math.round(course.durationMinutes / 60)}h</span>
      </div>

      {!compact && (
        <p className="text-micro text-ink-muted">{course.studentCount.toLocaleString()}+ students</p>
      )}
    </Link>
  );
}
