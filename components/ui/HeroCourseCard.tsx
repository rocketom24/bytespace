"use client";

import { useState, type MouseEvent } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Course } from "@/data/courses";

const SWIPE_THRESHOLD = 120;

export function HeroCourseCard({
  course,
  zIndex,
  isFront,
  offset,
  onSwiped,
  className,
}: {
  course: Course;
  zIndex: number;
  isFront?: boolean;
  offset?: { rotate: number; x: number; y: number; scale: number };
  onSwiped?: (direction: 1 | -1) => void;
  className?: string;
}) {
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-220, 220], [-18, 18]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      onSwiped?.(info.offset.x > 0 ? 1 : -1);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
  };

  return (
    <motion.div
      style={
        isFront
          ? { backgroundColor: course.coverColor, zIndex, x, rotate: dragRotate }
          : { backgroundColor: course.coverColor, zIndex }
      }
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      onMouseMove={isFront ? handleMouseMove : undefined}
      onHoverStart={isFront ? () => setIsHovering(true) : undefined}
      onHoverEnd={isFront ? () => setIsHovering(false) : undefined}
      whileHover={isFront ? { scale: 1.03, y: -6 } : undefined}
      whileDrag={{ cursor: "grabbing" }}
      animate={
        isFront
          ? undefined
          : { x: offset?.x ?? 0, y: offset?.y ?? 0, rotate: offset?.rotate ?? 0, scale: offset?.scale ?? 1 }
      }
      transition={
        isFront
          ? { type: "spring", stiffness: 340, damping: 28 }
          : { type: "spring", stiffness: 220, damping: 24 }
      }
      className={cn(
        "group relative flex h-[clamp(16rem,48vh,24rem)] w-full flex-col justify-end overflow-hidden rounded-3xl shadow-lg shadow-ink/10 lg:absolute lg:inset-0 lg:h-full",
        isFront ? "cursor-grab active:cursor-grabbing lg:cursor-none" : "",
        className
      )}
    >
      {isFront ? (
        <motion.div
          className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-semibold text-background shadow-lg shadow-ink/20 lg:flex"
          style={{ left: cursorX, top: cursorY }}
          animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Swipe
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </motion.div>
      ) : null}
      <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/20">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 opacity-0 shadow-lg transition-opacity",
            !isFront && "group-hover:opacity-100"
          )}
        >
          <Play className="h-5 w-5 fill-ink text-ink" aria-hidden />
        </span>
      </div>
      <div className="relative m-[clamp(0.6rem,1.4vh,1rem)] flex flex-col gap-1 rounded-2xl bg-surface/90 p-[clamp(0.75rem,1.6vh,1rem)] backdrop-blur">
        <p className="text-meta font-semibold text-ink">{course.title}</p>
        <div className="flex items-center gap-2 text-micro text-ink-muted">
          <span className="flex items-center gap-1 font-medium text-primary">
            <Star className="h-3 w-3 fill-current" aria-hidden />
            {course.rating}
          </span>
          <span>· {course.studentCount.toLocaleString()}+ students</span>
        </div>
      </div>
    </motion.div>
  );
}
