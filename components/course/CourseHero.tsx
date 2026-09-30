import Link from "next/link";
import { ViewTransition } from "react";
import { Star, Users, Clock, BarChart3, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CourseEnrollPanel } from "@/components/course/CourseEnrollPanel";
import { fakeLastUpdated } from "@/lib/courseDetail";
import type { Course } from "@/data/courses";
import type { Creator } from "@/data/creators";

export function CourseHero({ course, creator }: { course: Course; creator?: Creator }) {
  return (
    <div className="flex flex-col gap-[clamp(0.65rem,1.3vh,0.95rem)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <nav className="flex items-center gap-1 text-meta text-ink-muted" aria-label="Breadcrumb">
          <Link href="/courses" className="transition-colors hover:text-ink">
            Courses
          </Link>
          <span>/</span>
          <span className="text-ink">{course.category}</span>
        </nav>
        <Badge>{course.level}</Badge>
        <Badge className="bg-accent/15! text-accent!">{course.format}</Badge>
      </div>

      <div className="flex items-center gap-2.5">
        <ViewTransition name={`course-cover-${course.id}`} share="auto" default="none">
          <span
            aria-hidden
            className="h-[clamp(2rem,4.5vh,2.75rem)] w-[clamp(2rem,4.5vh,2.75rem)] shrink-0 rounded-xl"
            style={{ backgroundColor: course.coverColor }}
          />
        </ViewTransition>
        <h1 className="max-w-[40ch] text-title font-bold text-ink">{course.title}</h1>
      </div>

      <p className="max-w-[80ch] text-meta text-ink-muted">{course.summary}</p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-meta text-ink-muted">
        <span className="flex items-center gap-1.5 font-semibold text-ink">
          <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
          {course.rating}
          <span className="font-normal text-ink-muted">({course.commentCount})</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-primary" aria-hidden />
          {course.studentCount.toLocaleString()} students
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-primary" aria-hidden />
          {Math.round(course.durationMinutes / 60)}h
        </span>
        <span className="flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-primary" aria-hidden />
          {course.level}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarClock className="h-4 w-4 text-primary" aria-hidden />
          Updated {fakeLastUpdated(course)}
        </span>
        {creator && (
          <Link
            href={`/creator/${creator.id}`}
            className="flex items-center gap-1.5 font-semibold text-ink transition-colors hover:text-accent"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background">
              {creator.name.charAt(0)}
            </span>
            {creator.name}
          </Link>
        )}
      </div>

      <CourseEnrollPanel course={course} />
    </div>
  );
}
