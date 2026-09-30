"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CatMascot } from "@/components/ui/CatMascot";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useHideNavbar } from "@/components/layout/NavVisibility";
import { EASE_OUT } from "@/lib/motion";

export default function NotFound() {
  const reduceMotion = useReducedMotionSafe();
  useHideNavbar();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center gap-6 overflow-hidden px-[var(--gutter)] text-center">
      <SectionDoodles seed={17} density="light" accentWeight={0.2} />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="relative z-10 flex flex-col items-center gap-7"
      >
        <CatMascot expression="dizzy" bubble="Meow?! This page ran off." size="xl" />

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">404</p>
          <h1 className="max-w-md text-display font-bold text-ink">
            We couldn&apos;t find that page.
          </h1>
          <p className="max-w-sm text-lead text-ink-muted">
            The lesson you&apos;re looking for wandered off somewhere. Let&apos;s get you back on track.
          </p>
        </div>

        <Button href="/">Back home</Button>
      </motion.div>
    </div>
  );
}
