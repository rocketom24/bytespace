import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Course } from "@/data/courses";
import type { Creator } from "@/data/creators";

export function FeaturedCourseCard({
  course,
  creator,
}: {
  course: Course;
  creator?: Creator;
}) {
  return (
    <Link href={`/course/${course.id}`} className="block h-full">
      <Card className="flex h-full flex-col gap-4 transition-transform hover:-translate-y-1">
        <div className="h-36 rounded-2xl" style={{ backgroundColor: course.coverColor }} />
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{course.level}</Badge>
          <span className="flex items-center gap-1 text-sm font-semibold text-ink">
            <Star className="h-4 w-4 fill-current text-primary" />
            {course.rating}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-ink">{course.title}</h3>
        {creator && <p className="text-sm text-ink-muted">by {creator.name}</p>}
        <div className="mt-auto flex items-center justify-between text-xs text-ink-muted">
          <span>
            {course.lessonCount} lessons · {Math.round(course.durationMinutes / 60)}h
          </span>
          <span>{course.commentCount} comments</span>
        </div>
        <p className="text-lg font-bold text-primary">${course.price}</p>
      </Card>
    </Link>
  );
}
