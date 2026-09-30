import { notFound } from "next/navigation";
import Link from "next/link";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide, DEFAULT_PIN_SPAN } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
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
      <Slide
        label={lesson.title}
        depth={0.7}
        pinSpan={DEFAULT_PIN_SPAN}
        backdrop={<SectionDoodles seed={13} density="medium" />}
      >
        <Container className="relative z-10 flex flex-col gap-[clamp(0.6rem,1.6vh,1rem)]">
          {course && (
            <Link
              href={`/course/${course.id}`}
              className="text-meta text-ink-muted transition-colors hover:text-ink"
            >
              Back to {course.title}
            </Link>
          )}
          <h1 className="max-w-[20ch] text-title font-bold text-ink">{lesson.title}</h1>
          <div className="flex h-[clamp(11rem,38vh,22rem)] w-full items-center justify-center rounded-3xl bg-ink text-meta text-background">
            Lesson player placeholder
          </div>
          <p className="text-meta text-ink-muted">{lesson.durationMinutes} min</p>
        </Container>
      </Slide>

      <Slide
        label="Course lessons"
        depth={1}
        pinSpan={DEFAULT_PIN_SPAN}
        backdrop={<SectionDoodles seed={14} density="light" />}
      >
        <Container width="wide" className="relative z-10 flex flex-col gap-[var(--block)]">
          <h2 className="text-title font-bold text-ink">Course lessons</h2>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/lesson/${item.id}`}
                  className="flex h-full items-center justify-between gap-3 rounded-2xl bg-surface px-[clamp(1rem,1.4vw,1.5rem)] py-[clamp(0.6rem,1.4vh,1rem)] text-meta text-ink transition-colors duration-300 hover:bg-soft/40"
                >
                  <span>
                    {item.order}. {item.title}
                  </span>
                  <span className="shrink-0 text-ink-muted">{item.durationMinutes} min</span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
