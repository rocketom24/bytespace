import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide, DEFAULT_PIN_SPAN } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { CourseThumbnail } from "@/components/ui/thumbnails/CourseThumbnail";
import { PRESS_INTERACTIVE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseWatchSection } from "@/components/course/CourseWatchSection";
import { CourseLearnOutcomes } from "@/components/course/CourseLearnOutcomes";
import { CourseDescription } from "@/components/course/CourseDescription";
import { CourseCreatorSection } from "@/components/course/CourseCreatorSection";
import { CourseReviews } from "@/components/course/CourseReviews";
import { CourseFAQ } from "@/components/course/CourseFAQ";
import { CourseEnrollPanel } from "@/components/course/CourseEnrollPanel";
import { getCourseById } from "@/lib/courses";
import { courses } from "@/data/courses";
import { getCreatorById } from "@/lib/creators";
import { buildCurriculum, buildFAQ, pickRelatedCourses } from "@/lib/courseDetail";

export default async function CoursePage(props: PageProps<"/course/[id]">) {
  const { id } = await props.params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const creator = getCreatorById(course.creatorId);
  const sections = buildCurriculum(course);
  const faqs = buildFAQ(course, creator?.name);
  const related = pickRelatedCourses(course, courses);

  return (
    <ScrollTrack>
      <Slide
        label="Overview"
        depth={0.9}
        pinSpan={1.6}
        backdrop={<SectionDoodles seed={20} density="rich" />}
      >
        <Container width="wide" className="relative z-10 flex h-full flex-col gap-[clamp(0.85rem,1.6vh,1.15rem)]">
          <CourseHero course={course} creator={creator} />
          <div className="min-h-0 flex-1">
            <CourseWatchSection course={course} sections={sections} />
          </div>
        </Container>
      </Slide>

      <Slide
        label="Course value"
        depth={0.85}
        pinSpan={DEFAULT_PIN_SPAN}
        backdrop={<SectionDoodles seed={23} density="medium" />}
      >
        <Container width="wide" className="relative z-10 flex flex-col gap-[clamp(1.25rem,2.2vh,1.75rem)]">
          <div className="grid gap-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-[clamp(1rem,1.8vh,1.4rem)]">
              <h2 className="text-title font-bold text-ink">What you&apos;ll learn</h2>
              <CourseLearnOutcomes course={course} />
            </div>
            {creator && (
              <div className="flex flex-col gap-[clamp(1rem,1.8vh,1.4rem)]">
                <h2 className="text-title font-bold text-ink">Your instructor</h2>
                <CourseCreatorSection creator={creator} />
              </div>
            )}
          </div>
          <CourseDescription course={course} />
        </Container>
      </Slide>

      <Slide
        label="Reviews & FAQ"
        depth={0.8}
        pinSpan={DEFAULT_PIN_SPAN}
        isLast
        backdrop={<SectionDoodles seed={25} density="light" />}
      >
        <Container width="wide" className="relative z-10 grid gap-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-3 lg:items-start">
          <div className="flex flex-col gap-[clamp(1rem,1.8vh,1.4rem)]">
            <h2 className="text-title font-bold text-ink">What learners say</h2>
            <CourseReviews course={course} />
          </div>

          <div className="flex flex-col gap-[clamp(1rem,1.8vh,1.4rem)]">
            <h2 className="text-title font-bold text-ink">Frequently asked questions</h2>
            <CourseFAQ faqs={faqs} />
          </div>

          <div className="flex flex-col gap-[clamp(1.5rem,2.4vh,2rem)]">
            {related.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-title font-bold text-ink">Related courses</h2>
                <div className="flex flex-col gap-3">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      href={`/course/${item.id}`}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-sm shadow-ink/5",
                        PRESS_INTERACTIVE
                      )}
                    >
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl">
                        <CourseThumbnail course={item} showPlay={false} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-meta font-semibold text-ink">{item.title}</p>
                        <p className="flex items-center gap-1 text-micro text-ink-muted">
                          <Star className="h-3 w-3 fill-accent text-accent" aria-hidden />
                          {item.rating} · {Math.round(item.durationMinutes / 60)}h
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <h2 className="text-title font-bold text-ink">Ready to start learning?</h2>
              <CourseEnrollPanel course={course} />
            </div>
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
