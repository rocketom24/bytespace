import type { LucideIcon } from "lucide-react";
import { HAZE, LIME, MarkShape, MINT, RUST, TERRACOTTA, TINT_A, TINT_C, mulberry32, type MarkVariant } from "@/components/ui/decor";
import { cn } from "@/lib/cn";

export type CreatorArchetype = {
  id: string;
  role: string;
  blurb: string;
  /** Any integer - drives the deterministic portrait so the same archetype always renders the same way. */
  seed: number;
  icon: LucideIcon;
  gender: "male" | "female";
};

const MARK_VARIANTS: MarkVariant[] = ["squiggle", "burst", "dots", "arc", "scribble", "swirl"];
// A tight set of soft, low-saturation tones (all pre-mixed toward white/surface
// in decor.tsx) instead of the full accent-inclusive PALETTE - keeps every
// card reading as one quiet family instead of a random loud combination.
const SOFT_TONES = [MINT, HAZE, TINT_C, LIME, TINT_A];

/**
 * Abstract, fully-rounded creator portrait built entirely from the site's
 * existing gradient/mark vocabulary (`decor.tsx`) - no illustration assets,
 * so it always lands in-palette. Deterministic per `seed`: a near-flat soft
 * background, a single consistent silhouette tone, one quiet doodle accent.
 */
function buildPortrait(seed: number) {
  const rand = mulberry32(seed);
  const tone = (offset: number) => SOFT_TONES[(seed + offset) % SOFT_TONES.length];

  return {
    blobFrom: tone(0),
    blobTo: tone(1),
    blobCx: 30 + rand() * 20,
    blobCy: 25 + rand() * 15,
    mark: {
      variant: MARK_VARIANTS[Math.floor(rand() * MARK_VARIANTS.length)],
      rotate: Math.round((rand() - 0.5) * 50),
    },
  };
}

export function CreatorImageCard({
  archetype,
  className,
}: {
  archetype: CreatorArchetype;
  className?: string;
}) {
  const portrait = buildPortrait(archetype.seed);
  const Icon = archetype.icon;
  const gradientId = `creator-portrait-${archetype.id}`;

  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <div className="relative w-full max-w-[10.5rem]">
        <svg viewBox="0 0 100 100" className="aspect-square w-full rounded-full" aria-hidden>
          <defs>
            <radialGradient
              id={gradientId}
              cx={`${portrait.blobCx}%`}
              cy={`${portrait.blobCy}%`}
              r="75%"
            >
              <stop offset="0%" stopColor={portrait.blobFrom} />
              <stop offset="100%" stopColor={portrait.blobTo} />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill={`url(#${gradientId})`} />
          {archetype.gender === "male" ? (
            <g fill={TERRACOTTA} opacity={0.88}>
              <circle cx="50" cy="41" r="16" />
              <path d="M18 100C18 74 32 62 50 62C68 62 82 74 82 100Z" />
            </g>
          ) : (
            <>
              {/* Hair cap sits behind the face circle - drawn as a plain
                  ellipse so it can only ever bulge outward, never notch
                  inward into a hollow "vase" shape like a hand-drawn
                  outline could. */}
              <ellipse cx="50" cy="38" rx="19" ry="21" fill={RUST} opacity={0.88} />
              <g fill={TERRACOTTA} opacity={0.88}>
                <circle cx="50" cy="42" r="15" />
                <path d="M18 100C18 74 32 62 50 62C68 62 82 74 82 100Z" />
              </g>
              <g fill={RUST} opacity={0.88}>
                <path d="M34 51C30 61 29 73 32 85C34 81 36 75 37 68C38 61 37 55 34 51Z" />
                <path d="M66 51C70 61 71 73 68 85C66 81 64 75 63 68C62 61 63 55 66 51Z" />
              </g>
              <g fill="var(--surface)" opacity={0.95}>
                <path d="M42 23L50 19.5L50 26.5Z" />
                <path d="M58 23L50 19.5L50 26.5Z" />
                <circle cx="50" cy="23" r="1.7" />
              </g>
            </>
          )}
          <circle cx="50" cy="50" r="48.5" fill="none" stroke="var(--surface)" strokeWidth="3" opacity={0.5} />
        </svg>

        <svg
          viewBox="0 0 40 40"
          aria-hidden
          className="absolute -right-1 -top-1 h-8 w-8"
          style={{ color: "var(--ink-muted)", transform: `rotate(${portrait.mark.rotate}deg)`, opacity: 0.45 }}
        >
          <MarkShape variant={portrait.mark.variant} />
        </svg>

        <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-sm shadow-ink/10 ring-1 ring-ink/5">
          <Icon className="h-4 w-4 text-primary" aria-hidden />
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-meta font-semibold text-ink">{archetype.role}</h3>
        <p className="max-w-[14rem] text-micro text-ink-muted">{archetype.blurb}</p>
      </div>
    </div>
  );
}
