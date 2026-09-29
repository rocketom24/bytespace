import Link from "next/link";
import { ViewTransition } from "react";
import { Card } from "@/components/ui/Card";
import { PRESS_INTERACTIVE } from "@/lib/motion";
import type { Creator } from "@/data/creators";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/creator/${creator.id}`} className={`block h-full ${PRESS_INTERACTIVE}`}>
      <Card className="flex h-full flex-col gap-3">
        <ViewTransition name={`creator-avatar-${creator.id}`} share="auto" default="none">
          <div className="h-[clamp(3rem,7vh,4rem)] w-[clamp(3rem,7vh,4rem)] rounded-full bg-soft" />
        </ViewTransition>
        <h3 className="text-subtitle font-semibold text-ink">{creator.name}</h3>
        <p className="text-meta text-ink-muted">{creator.headline}</p>
      </Card>
    </Link>
  );
}
