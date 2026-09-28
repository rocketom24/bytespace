import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Creator } from "@/data/creators";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/creator/${creator.id}`}>
      <Card className="flex h-full flex-col gap-3">
        <div className="h-16 w-16 rounded-full bg-soft" />
        <h3 className="text-lg font-semibold text-ink">{creator.name}</h3>
        <p className="text-sm text-ink-muted">{creator.headline}</p>
      </Card>
    </Link>
  );
}
