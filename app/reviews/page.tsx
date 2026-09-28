import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { reviews } from "@/data/reviews";
import { courses } from "@/data/courses";

export default function ReviewsPage() {
  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-ink">What learners say</h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => {
              const course = courses.find((item) => item.id === review.courseId);
              return (
                <Card key={review.id} className="flex flex-col gap-3">
                  <p className="text-sm text-ink-muted">Rating: {review.rating}/5</p>
                  <p className="text-ink">&ldquo;{review.quote}&rdquo;</p>
                  <p className="text-sm font-semibold text-ink">{review.author}</p>
                  {course && <p className="text-xs text-ink-muted">on {course.title}</p>}
                </Card>
              );
            })}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
