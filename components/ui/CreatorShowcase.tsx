"use client";

import { Binary, Code2, PenTool, Video, type LucideIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { getPinWindow, useSlideProgress } from "@/components/layout/Slide";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { CreatorImageCard, type CreatorArchetype } from "@/components/ui/CreatorImageCard";

// Same pinned-scrub recipe as FeaturedCourseCluster: this section holds still
// for a few extra viewport-widths/heights of scroll (see Slide's `pinSpan`)
// so the cards reveal one-by-one against a long scrubbed timeline instead of
// fading in all at once during the brief moment the slide would pass by.
export const CREATOR_SHOWCASE_PIN_SPAN = 3;
const { enter: PIN_ENTER, exitStart: PIN_EXIT } = getPinWindow(CREATOR_SHOWCASE_PIN_SPAN);
const REVEAL_START = PIN_ENTER + 0.02;
const REVEAL_END = PIN_EXIT - 0.02;
// >1 so neighboring cards' reveal windows overlap slightly - a smooth
// hand-off instead of a stepped, one-at-a-time snap.
const REVEAL_OVERLAP = 1.6;
const REVEAL_SPRING = { stiffness: 220, damping: 32, mass: 0.6 } as const;

const ARCHETYPES: (CreatorArchetype & { icon: LucideIcon })[] = [
  {
    id: "code-mentor",
    role: "The Code Mentor",
    blurb: "Ships production patterns, not just theory.",
    seed: 11,
    icon: Code2,
    gender: "male",
  },
  {
    id: "design-educator",
    role: "The Design Educator",
    blurb: "Turns craft into a repeatable system.",
    seed: 27,
    icon: PenTool,
    gender: "female",
  },
  {
    id: "systems-builder",
    role: "The Systems Builder",
    blurb: "Breaks distributed problems into lessons.",
    seed: 42,
    icon: Binary,
    gender: "male",
  },
  {
    id: "storyteller",
    role: "The Storyteller",
    blurb: "Makes hard ideas easy to sit through.",
    seed: 58,
    icon: Video,
    gender: "female",
  },
];

function RevealCard({
  archetype,
  index,
  count,
  progress,
  reduceMotion,
}: {
  archetype: (typeof ARCHETYPES)[number];
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const span = REVEAL_END - REVEAL_START;
  const step = span / Math.max(count, 1);
  const start = reduceMotion ? -1 : REVEAL_START + index * step;
  const end = reduceMotion ? -0.999 : Math.min(REVEAL_END, start + step * REVEAL_OVERLAP);
  const rawReveal = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const reveal = useSpring(rawReveal, REVEAL_SPRING);
  const y = useTransform(reveal, [0, 1], [32, 0]);
  const scale = useTransform(reveal, [0, 1], [0.82, 1]);
  const rotate = useTransform(reveal, [0, 1], [index % 2 === 0 ? -7 : 7, 0]);

  return (
    <motion.div style={{ opacity: reveal, y, scale, rotate }}>
      <CreatorImageCard archetype={archetype} />
    </motion.div>
  );
}

export function CreatorShowcase() {
  const reduceMotion = useReducedMotionSafe();
  const slideProgress = useSlideProgress();
  const fallbackProgress = useMotionValue(1);
  const progress = slideProgress ?? fallbackProgress;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-[clamp(1.25rem,3vh,2rem)] sm:grid-cols-4">
      {ARCHETYPES.map((archetype, index) => (
        <RevealCard
          key={archetype.id}
          archetype={archetype}
          index={index}
          count={ARCHETYPES.length}
          progress={progress}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
