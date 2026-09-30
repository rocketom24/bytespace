"use client";

import { useState } from "react";
import { Heart, Share2, Check, ShieldCheck, Infinity as InfinityIcon, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { PRESS_INTERACTIVE } from "@/lib/motion";
import { fakePricing } from "@/lib/courseDetail";
import type { Course } from "@/data/courses";

export function CourseEnrollPanel({ course }: { course: Course }) {
  const [enrolled, setEnrolled] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const { originalPrice, discountPct } = fakePricing(course);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the visible "Copied!" state below is the demo feedback either way.
    }
    setShareState("copied");
    setTimeout(() => setShareState("idle"), 1600);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-surface px-[clamp(0.9rem,1.2vw,1.35rem)] py-[clamp(0.65rem,1vh,0.95rem)] shadow-sm shadow-ink/5">
      <div className="flex items-baseline gap-2">
        <span className="text-title font-bold text-ink">{course.price === 0 ? "Free" : `$${course.price}`}</span>
        {originalPrice && (
          <>
            <span className="text-meta text-ink-muted line-through">${originalPrice}</span>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-micro font-semibold text-accent">
              {discountPct}% off
            </span>
          </>
        )}
      </div>

      <div className="hidden items-center gap-3 text-micro text-ink-muted sm:flex">
        <span className="flex items-center gap-1" title="Lifetime access">
          <InfinityIcon className="h-3.5 w-3.5 text-primary" aria-hidden />
          Lifetime
        </span>
        <span className="flex items-center gap-1" title="Certificate on completion">
          <Award className="h-3.5 w-3.5 text-primary" aria-hidden />
          Certificate
        </span>
        <span className="flex items-center gap-1" title="30-day money-back guarantee">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
          30-day guarantee
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => setWishlisted((value) => !value)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink",
            PRESS_INTERACTIVE,
            wishlisted && "border-accent/40 bg-accent/10 text-accent"
          )}
        >
          <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} aria-hidden />
        </button>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share course"
          className={cn(
            "flex h-9 items-center gap-1.5 rounded-full border border-ink/15 px-3 text-meta font-semibold text-ink",
            PRESS_INTERACTIVE
          )}
        >
          <Share2 className="h-4 w-4" aria-hidden />
          {shareState === "copied" && "Copied!"}
        </button>
        <Button
          variant="primary"
          onClick={() => setEnrolled(true)}
          aria-pressed={enrolled}
          className={cn(enrolled && "bg-primary!")}
        >
          {enrolled ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Enrolled
            </>
          ) : course.price === 0 ? (
            "Start Learning"
          ) : (
            "Enroll Now"
          )}
        </Button>
      </div>
    </div>
  );
}
