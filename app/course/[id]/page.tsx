import { notFound } from "next/navigation";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { CreatorCard } from "@/components/ui/CreatorCard";
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
      <Slide>
        <Container className="flex flex-col gap-6">
          <div className="flex gap-2">
            <Badge>{course.category}</Badge>
            <Badge>{course.level}</Badge>
          </div>
          <h1 className="max-w-2xl text-4xl font-bold text-ink lg:text-5xl">
            {course.title}
          </h1>
          <p className="max-w-xl text-lg text-ink-muted">{course.summary}</p>
          <p className="text-sm text-ink-muted">
            {course.lessonCount} lessons · {Math.round(course.durationMinutes / 60)}h ·{" "}
            {course.studentCount.toLocaleString()} students · {course.rating}/5
          </p>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink">Curriculum</h2>
          <ol className="flex flex-col gap-3">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="flex items-center justify-between rounded-2xl bg-surface px-5 py-4 text-sm text-ink"
              >
                <span>
                  {lesson.order}. {lesson.title}
                </span>
                <span className="text-ink-muted">{lesson.durationMinutes} min</span>
              </li>
            ))}
          </ol>
        </Container>
      </Slide>

      {creator && (
        <Slide>
          <Container className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-ink">Your instructor</h2>
            <div className="max-w-sm">
              <CreatorCard creator={creator} />
            </div>
          </Container>
        </Slide>
      )}
    </ScrollTrack>
  );
}
