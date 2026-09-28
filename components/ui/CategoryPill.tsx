import { Code2, Languages, Cpu, Palette, Database, Cloud } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Category, CategoryIcon } from "@/data/categories";

export const categoryIconMap: Record<CategoryIcon, typeof Code2> = {
  code: Code2,
  language: Languages,
  systems: Cpu,
  design: Palette,
  data: Database,
  cloud: Cloud,
};

export function CategoryPill({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const Icon = categoryIconMap[category.icon];
  return (
    <div
      className={cn(
        "flex items-center gap-2 whitespace-nowrap rounded-full border border-ink/10 bg-surface px-5 py-2.5 text-sm font-medium text-ink",
        className
      )}
    >
      <Icon className="h-4 w-4 text-primary" aria-hidden />
      {category.name}
      <span className="text-ink-muted">· {category.courseCount}</span>
    </div>
  );
}
