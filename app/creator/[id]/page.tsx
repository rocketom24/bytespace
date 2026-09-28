import { notFound } from "next/navigation";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { CourseCard } from "@/components/ui/CourseCard";
import { getCreatorById } from "@/lib/creators";
import { getCoursesByCreatorId } from "@/lib/courses";

export default async function CreatorPage(props: PageProps<"/creator/[id]">) {
  const { id } = await props.params;
  const creator = getCreatorById(id);

  if (!creator) {
    notFound();
  }

  const creatorCourses = getCoursesByCreatorId(creator.id);

  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-4">
          <div className="h-20 w-20 rounded-full bg-soft" />
          <h1 className="text-4xl font-bold text-ink">{creator.name}</h1>
          <p className="text-lg text-ink-muted">{creator.headline}</p>
          <p className="max-w-xl text-ink-muted">{creator.bio}</p>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-ink">Courses by {creator.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creatorCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
