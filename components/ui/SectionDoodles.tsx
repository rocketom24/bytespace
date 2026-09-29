"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useSlideProgress } from "@/components/layout/Slide";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import {
  PALETTE,
  TEXT_COLOR_CLASSES,
  MarkShape,
  GRAIN_STYLE,
  VIGNETTE_STYLE,
  mulberry32,
  pickIcons,
  type MarkVariant,
} from "@/components/ui/decor";

type Zone = { top?: string; bottom?: string; left?: string; right?: string };

const ZONES: Zone[] = [
  { top: "4%", left: "3%" },
  { top: "4%", right: "3%" },
  { bottom: "4%", left: "3%" },
  { bottom: "4%", right: "3%" },
  { top: "42%", left: "1%" },
  { top: "42%", right: "1%" },
];

const DENSITY = {
  rich: { doodles: 17, rings: 3, marks: 3 },
  medium: { doodles: 11, rings: 2, marks: 2 },
  light: { doodles: 6, rings: 1, marks: 1 },
} as const;

const SIZE_TIERS = [
  { min: 12, max: 19, opacityMin: 0.11, opacityMax: 0.24, weight: 0.4, forceHidden: false },
  { min: 20, max: 33, opacityMin: 0.08, opacityMax: 0.18, weight: 0.38, forceHidden: false },
  { min: 34, max: 56, opacityMin: 0.05, opacityMax: 0.11, weight: 0.22, forceHidden: true },
] as const;

function pickSizeTier(rand: () => number) {
  const roll = rand();
  let acc = 0;
  for (const tier of SIZE_TIERS) {
    acc += tier.weight;
    if (roll <= acc) return tier;
  }
  return SIZE_TIERS[SIZE_TIERS.length - 1];
}

function jitterPct(rand: () => number, base: number, spread: number) {
  return `${Math.max(0, base + (rand() - 0.5) * spread).toFixed(1)}%`;
}

function zoneWithJitter(rand: () => number, zone: Zone): Zone {
  const jittered: Zone = {};
  if (zone.top !== undefined) jittered.top = jitterPct(rand, parseFloat(zone.top), 8);
  if (zone.bottom !== undefined) jittered.bottom = jitterPct(rand, parseFloat(zone.bottom), 8);
  if (zone.left !== undefined) jittered.left = jitterPct(rand, parseFloat(zone.left), 6);
  if (zone.right !== undefined) jittered.right = jitterPct(rand, parseFloat(zone.right), 6);
  return jittered;
}

function strokePath(rand: () => number) {
  const startY = 10 + rand() * 80;
  const endY = 10 + rand() * 80;
  const c1x = 20 + rand() * 30;
  const c1y = startY + (rand() - 0.5) * 60;
  const c2x = 60 + rand() * 30;
  const c2y = endY + (rand() - 0.5) * 60;
  return `M -10 ${startY.toFixed(0)} C ${c1x.toFixed(0)} ${c1y.toFixed(0)}, ${c2x.toFixed(0)} ${c2y.toFixed(0)}, 110 ${endY.toFixed(0)}`;
}

function shuffle<T>(rand: () => number, items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildRecipe(seed: number, density: keyof typeof DENSITY) {
  const rand = mulberry32(seed);
  const counts = DENSITY[density];
  const zoneOrder = shuffle(rand, ZONES);
  const nextZone = (i: number) => zoneWithJitter(rand, zoneOrder[i % zoneOrder.length]);

  const strokes = Array.from({ length: density === "light" ? 2 : 3 }, (_, i) => ({
    d: strokePath(rand),
    width: 3 + rand() * 4,
    from: PALETTE[(seed + i) % PALETTE.length],
    to: PALETTE[(seed + i + 4) % PALETTE.length],
  }));

  const icons = pickIcons(rand, counts.doodles);
  const doodles = icons.map((Icon, i) => {
    const tier = pickSizeTier(rand);
    return {
      Icon,
      ...nextZone(i + 1),
      size: Math.round(tier.min + rand() * (tier.max - tier.min)),
      rotate: Math.round((rand() - 0.5) * 80),
      colorClass: TEXT_COLOR_CLASSES[Math.floor(rand() * TEXT_COLOR_CLASSES.length)],
      opacityValue: (tier.opacityMin + rand() * (tier.opacityMax - tier.opacityMin)).toFixed(2),
      hiddenBelow: tier.forceHidden || rand() < 0.45,
    };
  });

  const rings = Array.from({ length: counts.rings }, (_, i) => ({
    ...nextZone(i + 2),
    size: Math.round(12 + rand() * 16),
    colorClass: TEXT_COLOR_CLASSES[Math.floor(rand() * TEXT_COLOR_CLASSES.length)],
    opacityValue: (0.16 + rand() * 0.2).toFixed(2),
    dashed: rand() < 0.5,
  }));

  const markVariants: MarkVariant[] = ["squiggle", "scribble", "swirl", "burst"];
  const marks = Array.from({ length: counts.marks }, (_, i) => ({
    variant: markVariants[Math.floor(rand() * markVariants.length)],
    ...nextZone(i + 3),
    size: Math.round(22 + rand() * 18),
    rotate: Math.round((rand() - 0.5) * 40),
    colorClass: TEXT_COLOR_CLASSES[Math.floor(rand() * TEXT_COLOR_CLASSES.length)],
    opacityValue: (0.14 + rand() * 0.14).toFixed(2),
  }));

  const parallaxRange = 12 + (seed % 5) * 3;
  const parallaxSign = seed % 2 === 0 ? 1 : -1;

  return { strokes, doodles, rings, marks, parallaxRange: parallaxRange * parallaxSign };
}

export function SectionDoodles({
  seed,
  density = "medium",
}: {
  seed: number;
  density?: keyof typeof DENSITY;
}) {
  const fallback = useMotionValue(0.5);
  const slideProgress = useSlideProgress();
  const reduceMotion = useReducedMotionSafe();
  const trackedProgress = slideProgress ?? fallback;
  const recipe = buildRecipe(seed, density);
  const driftRange = reduceMotion ? 0 : recipe.parallaxRange;
  const drift = useTransform(trackedProgress, [0, 0.5, 1], [driftRange, 0, -driftRange]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      <motion.div className="absolute inset-0 opacity-70 sm:opacity-90 lg:opacity-100" style={{ x: drift }}>
        <svg
          viewBox="-15 -15 130 130"
          preserveAspectRatio="none"
          className="absolute -left-[15%] -top-[15%] hidden h-[130%] w-[130%] sm:block"
          style={{ filter: "blur(6px)", opacity: 0.4 }}
        >
          <defs>
            {recipe.strokes.map((stroke, i) => (
              <linearGradient key={i} id={`section-stroke-${seed}-${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" style={{ stopColor: stroke.from }} />
                <stop offset="100%" style={{ stopColor: stroke.to }} />
              </linearGradient>
            ))}
          </defs>
          {recipe.strokes.map((stroke, i) => (
            <path
              key={i}
              d={stroke.d}
              fill="none"
              stroke={`url(#section-stroke-${seed}-${i})`}
              strokeWidth={stroke.width}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </motion.div>

      <div className="absolute inset-0" style={VIGNETTE_STYLE} />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={GRAIN_STYLE} />

      <div className="hidden sm:contents">
        {recipe.doodles.map((doodle, i) => (
          <doodle.Icon
            key={i}
            strokeWidth={1.25}
            className={`absolute ${doodle.colorClass} ${doodle.hiddenBelow ? "hidden xl:block" : ""}`}
            style={{
              width: doodle.size,
              height: doodle.size,
              top: doodle.top,
              bottom: doodle.bottom,
              left: doodle.left,
              right: doodle.right,
              opacity: doodle.opacityValue,
              transform: `rotate(${doodle.rotate}deg)`,
            }}
          />
        ))}

        {recipe.rings.map((ring, i) => (
          <span
            key={i}
            className={`absolute rounded-full border-2 ${ring.dashed ? "border-dashed" : ""} ${ring.colorClass.replace("text-", "border-")}`}
            style={{
              width: ring.size,
              height: ring.size,
              top: ring.top,
              bottom: ring.bottom,
              left: ring.left,
              right: ring.right,
              opacity: ring.opacityValue,
            }}
          />
        ))}

        {recipe.marks.map((mark, i) => (
          <svg
            key={i}
            viewBox="0 0 40 40"
            className={`absolute ${mark.colorClass}`}
            style={{
              width: mark.size,
              height: mark.size,
              top: mark.top,
              bottom: mark.bottom,
              left: mark.left,
              right: mark.right,
              opacity: mark.opacityValue,
              transform: `rotate(${mark.rotate}deg)`,
            }}
          >
            <MarkShape variant={mark.variant} />
          </svg>
        ))}
      </div>
    </div>
  );
}
