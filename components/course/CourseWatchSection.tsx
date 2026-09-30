"use client";

import { useState } from "react";
import { CourseVideoPlayer } from "@/components/course/CourseVideoPlayer";
import { CoursePlaylist } from "@/components/course/CoursePlaylist";
import type { PlaylistSection } from "@/lib/courseDetail";
import type { Course } from "@/data/courses";

const WATCH_HEIGHT = "clamp(16rem,44vh,26rem)";

export function CourseWatchSection({ course, sections }: { course: Course; sections: PlaylistSection[] }) {
  const flatLessons = sections.flatMap((section) => section.lessons);
  const defaultLesson = flatLessons.find((lesson) => !lesson.locked && !lesson.completed) ?? flatLessons[0];
  const [currentLessonId, setCurrentLessonId] = useState(defaultLesson?.id ?? "");
  const currentLesson = flatLessons.find((lesson) => lesson.id === currentLessonId);

  return (
    <div className="grid gap-[clamp(0.75rem,1.6vw,1.25rem)] lg:grid-cols-[3fr_2fr]">
      <div style={{ height: WATCH_HEIGHT }}>
        <CourseVideoPlayer course={course} currentLesson={currentLesson} />
      </div>
      <div style={{ height: WATCH_HEIGHT }}>
        <CoursePlaylist sections={sections} currentLessonId={currentLessonId} onSelect={setCurrentLessonId} />
      </div>
    </div>
  );
}
