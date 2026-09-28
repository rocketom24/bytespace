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
        "group flex flex-col gap-4 rounded-3xl bg-surface p-6 transition-transform hover:-translate-y-1",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-soft/60">
        <Icon className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-ink">{category.name}</h3>
        <p className="text-sm text-ink-muted">{category.courseCount} courses</p>
      </div>
      <span className="flex items-center gap-1 text-sm font-medium text-primary">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
