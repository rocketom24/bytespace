import Link from "next/link";
import { ViewTransition } from "react";
import { CreatorCoverImage } from "@/components/ui/CreatorCoverImage";
import { PRESS_INTERACTIVE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { Creator } from "@/data/creators";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/creator/${creator.id}`} className={cn("block h-full", PRESS_INTERACTIVE)}>
      <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-sm shadow-ink/5">
        <CreatorCoverImage seed={creator.id} className="h-[clamp(3.5rem,7vh,4.5rem)] w-full" />
        <div className="-mt-[clamp(1.5rem,3.5vh,2.25rem)] flex flex-col gap-2 px-[clamp(1rem,0.9vw+0.9vh,1.6rem)] pb-[clamp(1rem,0.9vw+0.9vh,1.6rem)]">
          <ViewTransition name={`creator-avatar-${creator.id}`} share="auto" default="none">
            <div className="h-[clamp(3rem,7vh,4rem)] w-[clamp(3rem,7vh,4rem)] rounded-full bg-soft ring-4 ring-surface" />
          </ViewTransition>
          <h3 className="text-subtitle font-semibold text-ink">{creator.name}</h3>
          <p className="text-meta text-ink-muted">{creator.headline}</p>
        </div>
      </div>
    </Link>
  );
}
