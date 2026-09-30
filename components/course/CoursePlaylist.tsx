"use client";

import { Lock, CheckCircle2, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { PRESS_INTERACTIVE } from "@/lib/motion";
import type { PlaylistSection } from "@/lib/courseDetail";

export function CoursePlaylist({
  sections,
  currentLessonId,
  onSelect,
}: {
  sections: PlaylistSection[];
  currentLessonId: string;
  onSelect: (lessonId: string) => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-surface p-[clamp(0.75rem,1.2vw,1.1rem)] shadow-sm shadow-ink/5">
      <p className="px-2 pb-2 text-meta font-semibold text-ink">Course content</p>
      <div className="flex-1 overflow-y-auto pr-1">
        <ol className="flex flex-col gap-3">
          {sections.map((section) => (
            <li key={section.id}>
              <p className="px-2 pb-1.5 text-micro font-semibold uppercase tracking-wide text-ink-muted">
                {section.title}
              </p>
              <ol className="flex flex-col gap-1">
                {section.lessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLessonId;
                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        disabled={lesson.locked}
                        onClick={() => onSelect(lesson.id)}
                        aria-current={isCurrent}
                        title={lesson.locked ? "Enroll to unlock this lesson" : undefined}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-meta",
                          PRESS_INTERACTIVE,
                          lesson.locked
                            ? "cursor-not-allowed text-ink-muted/60"
                            : isCurrent
                              ? "bg-accent/12 text-ink"
                              : "text-ink hover:bg-soft/40"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-micro font-semibold",
                            isCurrent ? "bg-accent text-background" : "bg-soft/60 text-ink-muted"
                          )}
                          aria-hidden
                        >
                          {lesson.locked ? (
                            <Lock className="h-3 w-3" aria-hidden />
                          ) : lesson.completed ? (
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                          ) : isCurrent ? (
                            <Play className="h-3 w-3 fill-current" aria-hidden />
                          ) : (
                            lesson.order
                          )}
                        </span>
                        <span className={cn("min-w-0 flex-1 truncate", isCurrent && "font-semibold")}>
                          {lesson.title}
                        </span>
                        <span className="shrink-0 text-micro text-ink-muted">{lesson.durationMinutes}m</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
