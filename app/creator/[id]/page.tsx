import { notFound } from "next/navigation";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { CourseCard } from "@/components/ui/CourseCard";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
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
      <Slide
        label={creator.name}
        depth={0.7}
        backdrop={<SectionDoodles seed={15} density="medium" />}
      >
        <Container className="relative z-10 flex flex-col gap-[clamp(0.6rem,1.6vh,1rem)]">
          <div className="h-[clamp(3.5rem,9vh,5rem)] w-[clamp(3.5rem,9vh,5rem)] rounded-full bg-soft" />
          <h1 className="text-display font-bold text-ink">{creator.name}</h1>
          <p className="text-subtitle text-ink-muted">{creator.headline}</p>
          <p className="max-w-[60ch] text-lead text-ink-muted">{creator.bio}</p>
        </Container>
      </Slide>

      <Slide
        label="Courses"
        depth={1}
        backdrop={<SectionDoodles seed={16} density="light" />}
      >
        <Container width="wide" className="relative z-10 flex flex-col gap-[var(--block)]">
          <h2 className="text-title font-bold text-ink">Courses by {creator.name}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] max-w-[min(100%,68rem)] gap-[clamp(0.75rem,1.6vw,1.5rem)]">
            {creatorCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
