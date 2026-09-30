import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { reviews } from "@/data/reviews";
import { courses } from "@/data/courses";

export default function ReviewsPage() {
  return (
    <ScrollTrack>
      <Slide
        label="Reviews"
        depth={0.9}
        backdrop={<SectionDoodles seed={9} density="medium" />}
      >
        <Container width="wide" className="relative z-10 flex flex-col gap-[var(--block)]">
          <h1 className="text-display font-bold text-ink">What learners say</h1>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] max-w-[min(100%,68rem)] gap-[clamp(0.75rem,1.6vw,1.5rem)]">
            {reviews.map((review) => {
              const course = courses.find((item) => item.id === review.courseId);
              return (
                <Card key={review.id} className="flex flex-col gap-3">
                  <p className="text-meta text-ink-muted">Rating: {review.rating}/5</p>
                  <p className="text-lead text-ink">&ldquo;{review.quote}&rdquo;</p>
                  <p className="text-meta font-semibold text-ink">{review.author}</p>
                  {course && <p className="text-micro text-ink-muted">on {course.title}</p>}
                </Card>
              );
            })}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
