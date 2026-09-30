"use client";

import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { Testimonial } from "@/data/testimonials";

const AVATAR_TINTS = ["var(--primary)", "var(--ink)", "var(--accent)"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCardTile({ testimonial, tint }: { testimonial: Testimonial; tint: string }) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-[clamp(0.6rem,1.4vh,1rem)] rounded-[2rem] bg-surface p-[clamp(1.25rem,1.1vw+1vh,1.75rem)] shadow-sm shadow-ink/5">
      <div className="flex gap-1 text-primary">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="text-lead text-ink">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3 pt-1">
        <div
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-meta font-semibold text-white"
          style={{ backgroundColor: tint }}
        >
          {initials(testimonial.author)}
        </div>
        <div className="flex flex-col">
          <span className="text-meta font-semibold text-ink">{testimonial.author}</span>
          <span className="text-micro text-ink-muted">{testimonial.role}</span>
        </div>
      </div>
      <p className="text-micro font-medium text-accent">{testimonial.stat}</p>
    </div>
  );
}

export function TestimonialsColumn({
  testimonials,
  className,
  duration = 15,
}: {
  testimonials: Testimonial[];
  className?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        animate={reduceMotion ? undefined : { translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-[clamp(0.75rem,1.6vw,1.5rem)] pb-[clamp(0.75rem,1.6vw,1.5rem)]"
      >
        {(reduceMotion ? [0] : [0, 1]).map((setIndex) => (
          <React.Fragment key={setIndex}>
            {testimonials.map((testimonial, i) => (
              <TestimonialCardTile
                key={`${setIndex}-${testimonial.id}`}
                testimonial={testimonial}
                tint={AVATAR_TINTS[i % AVATAR_TINTS.length]}
              />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
