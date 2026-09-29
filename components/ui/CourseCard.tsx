import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Course } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/course/${course.id}`} className="block h-full">
      <Card className="flex h-full flex-col gap-[clamp(0.5rem,1.2vh,0.9rem)] transition-transform duration-300 hover:-translate-y-1">
        <div className="h-[clamp(4rem,12vh,8rem)] rounded-2xl" style={{ backgroundColor: course.coverColor }} />
        <div className="flex flex-wrap gap-2">
          <Badge>{course.category}</Badge>
          <Badge>{course.level}</Badge>
        </div>
        <h3 className="text-subtitle font-semibold text-ink">{course.title}</h3>
        <p className="text-meta text-ink-muted">{course.summary}</p>
        <p className="text-micro text-ink-muted">
          {course.lessonCount} lessons · {Math.round(course.durationMinutes / 60)}h
        </p>
      </Card>
    </Link>
  );
}
