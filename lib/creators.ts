import { creators, type Creator } from "@/data/creators";

export function getCreatorById(id: string): Creator | undefined {
  return creators.find((creator) => creator.id === id);
}
