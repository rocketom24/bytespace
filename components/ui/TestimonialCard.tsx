import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex gap-1 text-primary">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="text-ink">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-auto flex flex-col">
        <span className="text-sm font-semibold text-ink">{testimonial.author}</span>
        <span className="text-xs text-ink-muted">{testimonial.role}</span>
      </div>
      <p className="text-xs font-medium text-primary">{testimonial.stat}</p>
    </Card>
  );
}
