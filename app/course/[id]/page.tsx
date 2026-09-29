import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { getCourseById } from "@/lib/courses";
import { getCreatorById } from "@/lib/creators";
import { getLessonsByCourseId } from "@/lib/lessons";

export default async function CoursePage(props: PageProps<"/course/[id]">) {
  const { id } = await props.params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const creator = getCreatorById(course.creatorId);
  const lessons = getLessonsByCourseId(course.id);

  return (
    <ScrollTrack>
      <Slide
        label={course.title}
        depth={0.7}
        backdrop={<SectionDoodles seed={10} density="rich" />}
      >
        <Container className="relative z-10 flex flex-col gap-[var(--block)]">
          <div className="flex items-center gap-3">
            <ViewTransition name={`course-cover-${course.id}`} share="auto" default="none">
              <span
                aria-hidden
                className="h-[clamp(2.5rem,6vh,3.5rem)] w-[clamp(2.5rem,6vh,3.5rem)] shrink-0 rounded-2xl"
                style={{ backgroundColor: course.coverColor }}
              />
            </ViewTransition>
            <div className="flex gap-2">
              <Badge>{course.category}</Badge>
              <Badge>{course.level}</Badge>
            </div>
          </div>
          <h1 className="max-w-[20ch] text-display font-bold text-ink">
            {course.title}
          </h1>
          <p className="max-w-[55ch] text-lead text-ink-muted">{course.summary}</p>
          <p className="text-meta text-ink-muted">
            {course.lessonCount} lessons · {Math.round(course.durationMinutes / 60)}h ·{" "}
            {course.studentCount.toLocaleString()} students · {course.rating}/5
          </p>
        </Container>
      </Slide>

      <Slide
        label="Curriculum"
        depth={1}
        backdrop={<SectionDoodles seed={11} density="medium" />}
      >
        <Container width="wide" className="relative z-10 flex flex-col gap-[var(--block)]">
          <h2 className="text-title font-bold text-ink">Curriculum</h2>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="flex h-full items-center justify-between gap-3 rounded-2xl bg-surface px-[clamp(1rem,1.4vw,1.5rem)] py-[clamp(0.6rem,1.4vh,1rem)] text-meta text-ink"
              >
                <span>
                  {lesson.order}. {lesson.title}
                </span>
                <span className="shrink-0 text-ink-muted">{lesson.durationMinutes} min</span>
              </li>
            ))}
          </ol>
        </Container>
      </Slide>

      {creator && (
        <Slide
          label="Instructor"
          depth={0.8}
          backdrop={<SectionDoodles seed={12} density="medium" />}
        >
          <Container className="relative z-10 flex flex-col gap-[var(--block)]">
            <h2 className="text-title font-bold text-ink">Your instructor</h2>
            <div className="max-w-sm">
              <CreatorCard creator={creator} />
            </div>
          </Container>
        </Slide>
      )}
    </ScrollTrack>
  );
}
