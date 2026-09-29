import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { CourseCard } from "@/components/ui/CourseCard";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { courses } from "@/data/courses";

const categories = Array.from(new Set(courses.map((course) => course.category)));

export default function SearchPage() {
  return (
    <ScrollTrack>
      <Slide
        label="Search"
        depth={0.7}
        backdrop={<SectionDoodles seed={7} density="medium" />}
      >
        <Container className="relative z-10 flex flex-col gap-[var(--block)]">
          <h1 className="max-w-[16ch] text-display font-bold text-ink">Find your next course</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </Container>
      </Slide>

      <Slide
        label="All courses"
        depth={1.1}
        backdrop={<SectionDoodles seed={8} density="light" />}
      >
        <Container width="wide" className="relative z-10 flex flex-col gap-[var(--block)]">
          <h2 className="text-title font-bold text-ink">All courses</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] max-w-[min(100%,68rem)] gap-[clamp(0.75rem,1.6vw,1.5rem)]">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
