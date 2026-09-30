import { BookOpen, Users, Star } from "lucide-react";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { Button } from "@/components/ui/Button";
import { getCoursesByCreatorId } from "@/lib/courses";
import type { Creator } from "@/data/creators";

export function CourseCreatorSection({ creator }: { creator: Creator }) {
  const creatorCourses = getCoursesByCreatorId(creator.id);
  const totalStudents = creatorCourses.reduce((sum, item) => sum + item.studentCount, 0);
  const avgRating = creatorCourses.length
    ? Math.round((creatorCourses.reduce((sum, item) => sum + item.rating, 0) / creatorCourses.length) * 10) / 10
    : 0;

  return (
    <div className="flex flex-col gap-[clamp(1.1rem,1.8vh,1.5rem)]">
      <CreatorCard creator={creator} />

      <div className="flex flex-col gap-[clamp(0.85rem,1.4vh,1.15rem)]">
        <p className="line-clamp-2 text-meta text-ink-muted">{creator.bio}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-meta text-ink-muted">
          <span className="flex items-center gap-1.5 font-semibold text-ink">
            <BookOpen className="h-4 w-4 text-primary" aria-hidden />
            {creatorCourses.length} courses
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-ink">
            <Users className="h-4 w-4 text-primary" aria-hidden />
            {totalStudents.toLocaleString()} students
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-ink">
            <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
            {avgRating} average rating
          </span>
        </div>
        <Button href={`/creator/${creator.id}`} variant="outline" className="w-fit">
          View Creator
        </Button>
      </div>
    </div>
  );
}
