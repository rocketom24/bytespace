import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CourseCard } from "@/components/ui/CourseCard";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { courses } from "@/data/courses";
import { creators } from "@/data/creators";

export default function HomePage() {
  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-6">
          <Badge>Learning, rebuilt for builders</Badge>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight text-ink lg:text-7xl">
            Learn to build, one lesson at a time.
          </h1>
          <p className="max-w-xl text-lg text-ink-muted">
            ByteSpace is a course-learning platform for people who want to ship real
            things, not just watch videos.
          </p>
          <div className="flex gap-4">
            <Button href="/search">Browse courses</Button>
            <Button href="/reviews" variant="outline">
              See reviews
            </Button>
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-ink">Featured courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-ink">Learn from people who ship</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col items-start gap-6">
          <h2 className="max-w-xl text-4xl font-bold text-ink">
            Ready to start your next course?
          </h2>
          <Button href="/search">Explore the catalog</Button>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
