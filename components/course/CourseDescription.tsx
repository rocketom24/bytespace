import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";
import type { Course } from "@/data/courses";

function requirements(course: Course): string[] {
  return [
    course.level === "Beginner" ? "No prior experience required" : `Comfortable with ${course.category.toLowerCase()} basics`,
    "A computer with a modern browser",
    "A few hours a week to practice",
  ];
}

function audience(course: Course): string[] {
  return [
    `Anyone who wants to get hands-on with ${course.category.toLowerCase()}`,
    course.level === "Advanced" ? "Engineers looking to go deeper on this topic" : "Beginners who want a clear, guided path",
    "Learners who prefer building real projects over theory",
  ];
}

export function CourseDescription({ course }: { course: Course }) {
  return (
    <div className="grid gap-[clamp(1.25rem,2.5vw,2rem)] lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <h3 className="text-subtitle font-semibold text-ink">Overview</h3>
        <p className="text-meta text-ink-muted">
          {course.summary} This {course.format.toLowerCase()} course is taught in {course.language} and structured as a
          series of short, focused lessons you can fit around a busy schedule — no long lectures, no wasted time.
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge>{course.category}</Badge>
          <Badge>{course.level}</Badge>
          <Badge>{course.format}</Badge>
          <Badge>{course.language}</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-[clamp(1.25rem,2.2vh,1.75rem)]">
        <div className="flex flex-col gap-2.5">
          <h3 className="text-subtitle font-semibold text-ink">Requirements</h3>
          <ul className="flex flex-col gap-2">
            {requirements(course).map((item) => (
              <li key={item} className="flex items-start gap-2 text-meta text-ink-muted">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-subtitle font-semibold text-ink">Who this course is for</h3>
          <ul className="flex flex-col gap-2">
            {audience(course).map((item) => (
              <li key={item} className="flex items-start gap-2 text-meta text-ink-muted">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
