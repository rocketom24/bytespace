import { notFound } from "next/navigation";
import Link from "next/link";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { getLessonById, getLessonsByCourseId } from "@/lib/lessons";
import { getCourseById } from "@/lib/courses";

export default async function LessonPage(props: PageProps<"/lesson/[id]">) {
  const { id } = await props.params;
  const lesson = getLessonById(id);

  if (!lesson) {
    notFound();
  }

  const course = getCourseById(lesson.courseId);
  const lessons = getLessonsByCourseId(lesson.courseId);

  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-4">
          {course && (
            <Link
              href={`/course/${course.id}`}
              className="text-sm text-ink-muted hover:text-ink"
            >
              Back to {course.title}
            </Link>
          )}
          <h1 className="max-w-2xl text-4xl font-bold text-ink">{lesson.title}</h1>
          <div className="flex h-64 items-center justify-center rounded-3xl bg-ink text-background">
            Lesson player placeholder
          </div>
          <p className="text-sm text-ink-muted">{lesson.durationMinutes} min</p>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink">Course lessons</h2>
          <ol className="flex flex-col gap-3">
            {lessons.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/lesson/${item.id}`}
                  className="flex items-center justify-between rounded-2xl bg-surface px-5 py-4 text-sm text-ink hover:bg-soft/40"
                >
                  <span>
                    {item.order}. {item.title}
                  </span>
                  <span className="text-ink-muted">{item.durationMinutes} min</span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
