"use client";

import { useEffect } from "react";
import { useMotionValue, useMotionValueEvent } from "framer-motion";
import { useSlideProgress } from "@/components/layout/Slide";
import { useHomeNavProgress } from "@/components/layout/HomeNavProgress";

/** Forwards the Learning Paths slide's own scroll progress up to the Navbar (which sits outside this Slide's tree) so it can morph into the compact layout as this section enters. */
export function HomeNavSync() {
  const fallback = useMotionValue(0);
  const slideProgress = useSlideProgress() ?? fallback;
  const homeNavProgress = useHomeNavProgress();

  useMotionValueEvent(slideProgress, "change", (value) => homeNavProgress.set(value));

  useEffect(() => () => homeNavProgress.set(0), [homeNavProgress]);

  return null;
}
