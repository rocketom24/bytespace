import type { Course } from "@/data/courses";

export function HeroCourseCard({ course, progress }: { course: Course; progress: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="flex items-center gap-4 rounded-3xl bg-surface p-5 shadow-lg shadow-ink/10">
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90 shrink-0">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--soft)" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-ink">{course.title}</p>
        <p className="text-xs text-ink-muted">{progress}% complete</p>
        <p className="text-xs font-medium text-primary">
          {course.studentCount.toLocaleString()}+ students
        </p>
      </div>
    </div>
  );
}
