import { Star } from "lucide-react";
import { buildReviews } from "@/lib/courseDetail";
import type { Course } from "@/data/courses";

export function CourseReviews({ course }: { course: Course }) {
  const { reviews, breakdown, average } = buildReviews(course);
  const maxCount = Math.max(...breakdown, 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 rounded-3xl bg-surface p-[clamp(1rem,1.4vw,1.5rem)] shadow-sm shadow-ink/5">
        <div className="flex shrink-0 flex-col items-center gap-1">
          <p className="text-title font-bold text-ink">{average}</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(average) ? "fill-accent text-accent" : "text-ink/15"}`} aria-hidden />
            ))}
          </div>
          <p className="whitespace-nowrap text-micro text-ink-muted">{reviews.length} reviews</p>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          {breakdown.map((count, index) => {
            const stars = 5 - index;
            return (
              <div key={stars} className="flex items-center gap-2 text-micro text-ink-muted">
                <span className="w-6 shrink-0">{stars}★</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-soft/60">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${(count / maxCount) * 100}%` }} />
                </div>
                <span className="w-4 shrink-0 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-h-[clamp(13rem,30vh,18rem)] overflow-y-auto pr-1">
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-2 rounded-2xl bg-surface p-[clamp(0.9rem,1.2vw,1.25rem)] shadow-sm shadow-ink/5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-soft text-micro font-bold text-ink">
                  {review.author.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-meta font-semibold text-ink">{review.author}</p>
                  <p className="truncate text-micro text-ink-muted">
                    {review.role ? `${review.role} · ` : ""}
                    {review.timeAgo}
                  </p>
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-accent text-accent" : "text-ink/15"}`} aria-hidden />
                  ))}
                </div>
              </div>
              <p className="line-clamp-2 text-micro text-ink-muted">{review.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
