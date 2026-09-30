import { Rocket, Brain, CheckCircle2, Target, Award, Users, type LucideIcon } from "lucide-react";
import { PINE, FOREST, JADE, TERRACOTTA, RUST } from "@/components/ui/decor";
import type { Course } from "@/data/courses";

// Dark enough for a white icon to stay legible — the full PALETTE includes near-white tints (MINT, HAZE) that wash out.
const ICON_COLORS = [PINE, TERRACOTTA, JADE, RUST, FOREST, "var(--primary)"];

function outcomes(course: Course): { icon: LucideIcon; text: string }[] {
  const category = course.category.toLowerCase();
  return [
    { icon: Rocket, text: `Build real ${category} projects from scratch` },
    { icon: Brain, text: `Understand the core concepts behind ${course.title}` },
    { icon: CheckCircle2, text: "Avoid the common mistakes beginners make" },
    { icon: Target, text: `Apply what you learn to real ${category} work` },
    { icon: Award, text: "Earn a certificate to showcase on your profile" },
    { icon: Users, text: "Get feedback from a real instructor, not just a forum" },
  ];
}

export function CourseLearnOutcomes({ course }: { course: Course }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {outcomes(course).map((item, index) => (
        <div key={item.text} className="flex items-start gap-3 rounded-2xl bg-surface p-[clamp(0.85rem,1.2vw,1.15rem)] shadow-sm shadow-ink/5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-background"
            style={{ backgroundColor: ICON_COLORS[index % ICON_COLORS.length] }}
            aria-hidden
          >
            <item.icon className="h-4 w-4" aria-hidden />
          </span>
          <p className="text-meta text-ink">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
