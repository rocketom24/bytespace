"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Bookmark, Play, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { getCreatorById } from "@/lib/creators";
import type { Course } from "@/data/courses";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const SWIPE_THRESHOLD = 120;
const DRAG_ROTATE_RANGE = 220;
const DRAG_ROTATE_DEG = 18;
const FRONT_SPRING = { type: "spring", stiffness: 340, damping: 28 } as const;
const BACK_SPRING = { type: "spring", stiffness: 220, damping: 24 } as const;

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
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  // x/y/rotate/scale stay the same motion values across front and back
  // roles (never swapped out of `style`), so the card resting position is
  // just animated to from wherever it currently is - no reset-to-identity
  // frame when the stack reorders.
  useEffect(() => {
    const target = isFront
      ? { x: 0, y: 0, rotate: 0, scale: 1 }
      : { x: offset?.x ?? 0, y: offset?.y ?? 0, rotate: offset?.rotate ?? 0, scale: offset?.scale ?? 1 };
    const transition = isFront ? FRONT_SPRING : BACK_SPRING;
    const controls = [
      animate(x, target.x, transition),
      animate(y, target.y, transition),
      animate(rotate, target.rotate, transition),
      animate(scale, target.scale, transition),
    ];
    return () => controls.forEach((control) => control.stop());
  }, [isFront, offset?.x, offset?.y, offset?.rotate, offset?.scale, x, y, rotate, scale]);

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

  // Only a live pointer drag should drive rotate off x; using an x.on()
  // subscription instead would also fire while the settle animate() above
  // is programmatically moving x, fighting it for the same rotate value.
  const handleDrag = (_: unknown, info: PanInfo) => {
    const deg = (info.offset.x / DRAG_ROTATE_RANGE) * DRAG_ROTATE_DEG;
    rotate.set(Math.max(-DRAG_ROTATE_DEG, Math.min(DRAG_ROTATE_DEG, deg)));
  };

  return (
    <motion.div
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 32 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onMouseMove={isFront ? handleMouseMove : undefined}
      onHoverStart={isFront ? () => setIsHovering(true) : undefined}
      onHoverEnd={isFront ? () => setIsHovering(false) : undefined}
      whileHover={isFront ? { scale: 1.03, y: -6 } : undefined}
      whileDrag={{ cursor: "grabbing" }}
      className={cn(
        "group relative flex h-[clamp(16rem,48vh,24rem)] w-full flex-col justify-end overflow-hidden rounded-3xl shadow-lg shadow-ink/10 lg:absolute lg:inset-0 lg:h-full",
        isFront ? "cursor-grab active:cursor-grabbing lg:cursor-none" : "",
        className
      )}
      style={{
        backgroundColor: course.coverColor,
        zIndex,
        x,
        y,
        rotate,
        scale,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
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

      {isFront ? (
        <div className="absolute left-3 top-3 z-10 hidden items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-background lg:flex">
          <span
            className={cn("h-1.5 w-1.5 rounded-full", course.format === "Live" ? "bg-red-400" : "bg-accent")}
            aria-hidden
          />
          {course.format === "Live" ? "Live · Week 1" : course.format}
        </div>
      ) : null}
      {isFront ? (
        <span
          aria-hidden
          className="absolute right-3 top-3 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md lg:flex"
        >
          <Bookmark className="h-4 w-4" aria-hidden />
        </span>
      ) : null}

      <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/20">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 shadow-lg transition-opacity",
            isFront ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <Play className="h-5 w-5 fill-ink text-ink" aria-hidden />
        </span>
      </div>

      <div className="relative m-[clamp(0.6rem,1.4vh,1rem)] flex flex-col gap-2 rounded-2xl bg-surface/95 p-[clamp(0.75rem,1.6vh,1rem)] backdrop-blur">
        <p className="text-micro font-semibold uppercase tracking-wide text-ink-muted">
          {course.category} · {course.lessonCount} lessons
        </p>
        <p className="text-meta font-bold text-ink">{course.title}</p>
        {(() => {
          const creator = getCreatorById(course.creatorId);
          if (!creator) return null;
          return (
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background">
                {initials(creator.name)}
              </span>
              <span className="truncate text-micro font-medium text-ink-muted">{creator.name}</span>
            </div>
          );
        })()}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-soft">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${(course.rating / 5) * 100}%` }}
            aria-hidden
          />
        </div>
        <div className="flex items-center gap-2 text-micro text-ink-muted">
          <span className="flex items-center gap-1 font-medium text-primary">
            <Star className="h-3 w-3 fill-current" aria-hidden />
            {course.rating}
          </span>
          <span>· {course.studentCount.toLocaleString()} students</span>
        </div>
      </div>
    </motion.div>
  );
}
