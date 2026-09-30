"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/cn";

const MAX_PUPIL_X = 4.5;
const MAX_PUPIL_Y = 3.5;

export function CatMascot({
  className,
  bubble = "Meow! Let's find your course.",
}: {
  className?: string;
  bubble?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();

  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);
  const smoothX = useSpring(pupilX, { stiffness: 180, damping: 16, mass: 0.6 });
  const smoothY = useSpring(pupilY, { stiffness: 180, damping: 16, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.4;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const reach = Math.min(1, Math.hypot(dx, dy) / 220);
      pupilX.set(Math.cos(angle) * MAX_PUPIL_X * reach);
      pupilY.set(Math.sin(angle) * MAX_PUPIL_Y * reach);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduceMotion, pupilX, pupilY]);

  return (
    <div ref={wrapperRef} className={cn("relative flex shrink-0 flex-col items-center", className)}>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 mb-[-0.35rem] w-fit max-w-[11rem] rounded-2xl bg-surface px-3.5 py-2 text-center shadow-md shadow-ink/10 ring-2 ring-accent/40"
      >
        <p className="text-micro font-semibold text-ink">{bubble}</p>
        <span
          aria-hidden
          className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1.5 rotate-45 bg-surface"
        />
      </motion.div>

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={reduceMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-0 w-[clamp(4.5rem,6vw,6.5rem)]"
      >
        <svg viewBox="0 0 220 190" className="w-full drop-shadow-lg" aria-hidden>
          <motion.ellipse
            cx="112"
            cy="182"
            rx="52"
            ry="7"
            fill="var(--ink)"
            opacity="0.12"
            animate={reduceMotion ? undefined : { scaleX: [1, 0.92, 1] }}
            transition={reduceMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "112px 182px" }}
          />

          <motion.g
            style={reduceMotion ? undefined : { transformOrigin: "176px 130px" }}
            animate={reduceMotion ? undefined : { rotate: [0, -6, 3, 0] }}
            transition={reduceMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          >
            <path
              d="M172,140 C 202,144 212,110 196,88 C 187,75 172,80 178,94"
              fill="none"
              stroke="var(--ink)"
              strokeWidth={15}
              strokeLinecap="round"
            />
          </motion.g>

          <path
            d="M49.08,66.56 L32.19,23.58 Q30,18 34.91,21.45 L77.46,51.4 Q84,56 77.03,59.92 L58.97,70.08 Q52,74 49.08,66.56 Z"
            fill="var(--ink)"
          />
          <path
            d="M170.92,66.56 L187.81,23.58 Q190,18 185.09,21.45 L142.54,51.4 Q136,56 142.97,59.92 L161.03,70.08 Q168,74 170.92,66.56 Z"
            fill="var(--ink)"
          />

          <ellipse cx="110" cy="122" rx="72" ry="56" fill="var(--ink)" />

          <g stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" opacity="0.85">
            <path d="M41,140 L15,130" />
            <path d="M46,150 L10,150" />
            <path d="M53,160 L18,170" />
            <path d="M179,140 L205,130" />
            <path d="M174,150 L210,150" />
            <path d="M167,160 L202,170" />
          </g>

          <motion.g
            style={reduceMotion ? undefined : { transformOrigin: "110px 116px" }}
            animate={reduceMotion ? undefined : { scaleY: [1, 1, 1, 0.1, 1] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.72, 0.76, 0.8, 0.84] }
            }
          >
            <ellipse cx="86" cy="117" rx="14" ry="21" fill="var(--surface)" />
            <ellipse cx="134" cy="117" rx="14" ry="21" fill="var(--surface)" />
            <motion.circle cx="86" cy="120" r="6" fill="var(--ink)" style={{ x: smoothX, y: smoothY }} />
            <motion.circle cx="134" cy="120" r="6" fill="var(--ink)" style={{ x: smoothX, y: smoothY }} />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
