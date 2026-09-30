import type { Transition, Variants } from "framer-motion";

/** Shared easing/duration tokens so every animated surface feels like one system. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.15,
  base: 0.2,
} as const;

/** Spring used by the panel-style dropdowns (filter panel, search results, nav menus). */
export const PANEL_SPRING: Transition = { type: "spring", bounce: 0.2, duration: 0.35 };

/**
 * Fade + rise + scale used for anything that pops open near its trigger
 * (filter panel, mobile nav menu). Matches the recipe already proven in
 * HeroSearchSpotlight/Navbar so new dropdowns read as the same system.
 */
export function panelVariants(reduceMotion: boolean): Variants {
  return {
    hidden: { opacity: 0, y: -8, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion ? { duration: 0 } : PANEL_SPRING,
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.96,
      transition: reduceMotion ? { duration: 0 } : { duration: DURATION.fast },
    },
  };
}

/**
 * Quiet fade+rise for content that swaps in place (search results, filtered
 * grids). No layout animation, no exit choreography, so a swap never leaves
 * old and new content mounted together and pushing the page taller.
 */
export function fadeInProps(reduceMotion: boolean) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : { duration: DURATION.base, ease: EASE_OUT },
  } as const;
}

/**
 * CSS-only press/hover feedback for buttons and cards that don't need Framer.
 * Bundles its own `transition-property` list (color + transform) rather than
 * layering `transition-transform` on top of an element's existing
 * `transition-colors` utility — two transition-* utilities on one element
 * both set `transition-property` directly, so only the later one in
 * Tailwind's generated stylesheet actually applies; stacking them silently
 * drops one of the two transitions instead of combining them.
 */
export const PRESS_INTERACTIVE =
  "transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.97]";
export const HOVER_LIFT = "hover:scale-[1.015]";
