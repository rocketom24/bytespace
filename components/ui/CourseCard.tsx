import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Course } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/course/${course.id}`}>
      <Card className="flex h-full flex-col gap-4">
        <div className="h-32 rounded-2xl" style={{ backgroundColor: course.coverColor }} />
        <div className="flex flex-wrap gap-2">
          <Badge>{course.category}</Badge>
          <Badge>{course.level}</Badge>
        </div>
        <h3 className="text-lg font-semibold text-ink">{course.title}</h3>
        <p className="text-sm text-ink-muted">{course.summary}</p>
        <p className="text-xs text-ink-muted">
          {course.lessonCount} lessons · {Math.round(course.durationMinutes / 60)}h
        </p>
      </Card>
    </Link>
  );
}
