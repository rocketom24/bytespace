"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryIconMap } from "@/components/ui/CategoryPill";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { Category } from "@/data/categories";

/**
 * Horizontal accordion deck, adapted from the FlowStack reference
 * (framer.com/marketplace/components/fluid-card-stack): a row of
 * equal-width panels sitting flush like one deck. Activating a panel
 * grows its share of the row while the rest compress - framer-motion's
 * `layout` animates the width swap, so no separate motion system.
 */
const EXPAND_SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 1 } as const;
const ACTIVE_GROW = 5;
const IDLE_GROW = 1;

function PathDeckCard({
  category,
  isActive,
  isCompressed,
  onActivate,
  reduceMotion,
}: {
  category: Category;
  isActive: boolean;
  isCompressed: boolean;
  onActivate: () => void;
  reduceMotion: boolean;
}) {
  const Icon = categoryIconMap[category.icon];

  const face = (
    <div className="flex h-full flex-col gap-[clamp(0.75rem,2.6vh,1.25rem)] p-[clamp(0.85rem,1.6vw,1.35rem)]">
      <div className="flex h-[clamp(2.1rem,4.2vh,2.6rem)] w-[clamp(2.1rem,4.2vh,2.6rem)] shrink-0 items-center justify-center rounded-2xl bg-soft/60">
        <Icon className="h-4.5 w-4.5 text-primary" aria-hidden />
      </div>

      <div
        className={cn(
          "mt-auto flex min-h-0 flex-1 flex-col gap-2",
          isCompressed
            ? "items-center justify-end"
            : !isActive && "items-center justify-end sm:items-stretch sm:justify-start"
        )}
      >
        <h3
          className={cn(
            "font-semibold text-ink",
            isCompressed
              ? "text-micro [writing-mode:vertical-rl]"
              : isActive
                ? "text-meta"
                : "text-micro [writing-mode:vertical-rl] sm:text-meta sm:[writing-mode:horizontal-tb]"
          )}
        >
          {category.name}
        </h3>

        {isActive ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { delay: 0.15, duration: 0.3 }}
            className="flex flex-col gap-2"
          >
            <p className="text-micro text-ink-muted">{category.courseCount} courses</p>
            <Link
              href="/courses"
              className="flex w-fit items-center gap-1 text-micro font-medium text-primary"
            >
              Explore
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </motion.div>
        ) : null}
      </div>
    </div>
  );

  return (
    <motion.div
      layout={!reduceMotion}
      transition={reduceMotion ? { duration: 0 } : EXPAND_SPRING}
      style={{ flexGrow: isActive ? ACTIVE_GROW : IDLE_GROW, flexBasis: 0 }}
      className="relative min-w-0 overflow-hidden rounded-3xl bg-surface shadow-lg shadow-ink/10 ring-1 ring-ink/5"
      onHoverStart={onActivate}
    >
      {isActive ? (
        face
      ) : (
        <button
          type="button"
          onClick={onActivate}
          aria-label={`Show ${category.name} courses`}
          className="h-full w-full text-left"
        >
          {face}
        </button>
      )}
    </motion.div>
  );
}

export function PathDeck({ categories }: { categories: Category[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className="flex h-[clamp(13rem,30vh,17rem)] w-full max-w-[min(100%,64rem)] gap-2 self-center">
      {categories.map((category) => (
        <PathDeckCard
          key={category.id}
          category={category}
          isActive={category.id === activeId}
          isCompressed={activeId !== null && category.id !== activeId}
          onActivate={() => setActiveId(category.id)}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
