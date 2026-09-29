import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col gap-[clamp(0.6rem,1.4vh,1rem)]">
      <div className="flex gap-1 text-primary">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="text-lead text-ink">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-auto flex flex-col">
        <span className="text-meta font-semibold text-ink">{testimonial.author}</span>
        <span className="text-micro text-ink-muted">{testimonial.role}</span>
      </div>
      <p className="text-micro font-medium text-primary">{testimonial.stat}</p>
    </Card>
  );
}
