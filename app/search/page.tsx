import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { CourseCard } from "@/components/ui/CourseCard";
import { courses } from "@/data/courses";

const categories = Array.from(new Set(courses.map((course) => course.category)));

export default function SearchPage() {
  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-ink">Find your next course</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-ink">All courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
