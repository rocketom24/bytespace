import { MarkShape, TERRACOTTA, RUST, mulberry32, type MarkVariant } from "@/components/ui/decor";

const VARIANTS: MarkVariant[] = ["squiggle", "scribble", "swirl", "burst", "dots", "arc"];
const CREAM = "#FDF6EF";

function hashSeed(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return hash;
}

/** Deterministic, per-creator abstract doodle banner — terracotta gradient with scattered line-art marks. */
export function CreatorCoverImage({ seed, className }: { seed: string; className?: string }) {
  const rand = mulberry32(hashSeed(seed));
  const gradientId = `creator-cover-${seed}`;
  const marks = Array.from({ length: 5 }, () => ({
    variant: VARIANTS[Math.floor(rand() * VARIANTS.length)],
    x: 4 + rand() * 88,
    y: 6 + rand() * 76,
    size: 22 + rand() * 26,
    rotate: Math.round((rand() - 0.5) * 60),
    opacity: 0.3 + rand() * 0.32,
  }));

  return (
    <svg
      viewBox="0 0 400 120"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={TERRACOTTA} />
          <stop offset="100%" stopColor={RUST} />
        </linearGradient>
      </defs>
      <rect width={400} height={120} fill={`url(#${gradientId})`} />
      {marks.map((mark, i) => (
        <svg
          key={i}
          x={(mark.x / 100) * 400 - mark.size / 2}
          y={(mark.y / 100) * 120 - mark.size / 2}
          width={mark.size}
          height={mark.size}
          viewBox="0 0 40 40"
          opacity={mark.opacity}
          style={{ transform: `rotate(${mark.rotate}deg)`, transformOrigin: "center" }}
        >
          <g style={{ color: CREAM }}>
            <MarkShape variant={mark.variant} />
          </g>
        </svg>
      ))}
    </svg>
  );
}
