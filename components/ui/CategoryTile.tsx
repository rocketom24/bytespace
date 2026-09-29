import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { categoryIconMap } from "@/components/ui/CategoryPill";
import type { Category } from "@/data/categories";

export function CategoryTile({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const Icon = categoryIconMap[category.icon];
  return (
    <Link
      href="/search"
      className={cn(
        "group flex flex-col gap-[clamp(0.6rem,1.4vh,1rem)] rounded-3xl bg-surface p-[clamp(1rem,0.9vw+0.9vh,1.6rem)] transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className="flex h-[clamp(2.25rem,4.6vh,2.9rem)] w-[clamp(2.25rem,4.6vh,2.9rem)] items-center justify-center rounded-2xl bg-soft/60">
        <Icon className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-subtitle font-semibold text-ink">{category.name}</h3>
        <p className="text-meta text-ink-muted">{category.courseCount} courses</p>
      </div>
      <span className="mt-auto flex items-center gap-1 text-meta font-medium text-primary">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
