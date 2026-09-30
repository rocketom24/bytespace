"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { CourseThumbnail } from "@/components/ui/thumbnails/CourseThumbnail";
import { cn } from "@/lib/cn";
import type { Course } from "@/data/courses";

const DEMO_SECONDS = 18;

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function CourseVideoPlayer({
  course,
  currentLesson,
}: {
  course: Course;
  currentLesson?: { title: string; order: number; durationMinutes: number };
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [currentLesson?.order]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((value) => {
        const next = value + 100 / (DEMO_SECONDS * 10);
        if (next >= 100) {
          setPlaying(false);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = async () => {
    const node = wrapperRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await node.requestFullscreen?.();
    }
  };

  const seek = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setProgress(fraction * 100);
    if (fraction >= 1) setPlaying(false);
  };

  const elapsedSeconds = (progress / 100) * DEMO_SECONDS;
  const totalLabel = currentLesson ? `${currentLesson.durationMinutes}:00` : formatClock(DEMO_SECONDS);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-ink shadow-xl shadow-ink/25",
        fullscreen && "bg-ink"
      )}
    >
      <div className="relative flex-1">
        <CourseThumbnail course={course} showPlay={false} className="opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/40" aria-hidden />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-micro font-semibold text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {currentLesson ? `Now playing · Lesson ${currentLesson.order}` : "Course preview"}
        </div>

        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full bg-background/95 shadow-lg shadow-ink/30 transition-transform duration-300",
              "group-hover:scale-105",
              playing && "scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100"
            )}
          >
            {playing ? (
              <Pause className="h-5 w-5 fill-ink text-ink" aria-hidden />
            ) : (
              <Play className="h-5 w-5 translate-x-0.5 fill-ink text-ink" aria-hidden />
            )}
          </span>
        </button>

        <p className="absolute bottom-4 left-4 max-w-[70%] truncate text-meta font-semibold text-background">
          {currentLesson?.title ?? course.title}
        </p>
      </div>

      <div className="flex items-center gap-3 bg-ink px-4 py-3">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-background transition-colors hover:bg-background/10"
        >
          {playing ? <Pause className="h-4 w-4 fill-current" aria-hidden /> : <Play className="h-4 w-4 fill-current" aria-hidden />}
        </button>

        <span className="shrink-0 text-micro tabular-nums text-background/80">{formatClock(elapsedSeconds)}</span>

        <div
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          tabIndex={0}
          onClick={seek}
          className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-background/20"
        >
          <div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${progress}%` }} />
        </div>

        <span className="shrink-0 text-micro tabular-nums text-background/80">{totalLabel}</span>

        <button
          type="button"
          onClick={() => setMuted((value) => !value)}
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={muted}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-background transition-colors hover:bg-background/10"
        >
          {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-background transition-colors hover:bg-background/10"
        >
          {fullscreen ? <Minimize className="h-4 w-4" aria-hidden /> : <Maximize className="h-4 w-4" aria-hidden />}
        </button>
      </div>
    </div>
  );
}
