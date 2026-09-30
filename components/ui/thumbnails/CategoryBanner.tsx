import { cn } from "@/lib/cn";
import type { Category } from "@/data/categories";
import { FALLBACK_GRADIENT, GRADIENTS_BY_ICON, ReactBlocksScene, SCENES_BY_ICON } from "@/components/ui/thumbnails/scenes";

/**
 * Decorative illustrated banner for a category, sharing the same
 * terracotta/orange scene set as `CourseThumbnail` so the "Learning paths"
 * deck and the course grid read as one visual system.
 */
export function CategoryBanner({ icon, className }: { icon: Category["icon"]; className?: string }) {
  const Scene = SCENES_BY_ICON[icon] ?? ReactBlocksScene;
  const [from, to] = GRADIENTS_BY_ICON[icon] ?? FALLBACK_GRADIENT;
  const gradientId = `category-gradient-${icon}`;

  return (
    <svg
      viewBox="0 0 400 267"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      focusable="false"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width={400} height={267} fill={`url(#${gradientId})`} />
      <Scene />
    </svg>
  );
}
