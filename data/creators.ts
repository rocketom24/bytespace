export type Creator = {
  id: string;
  slug: string;
  name: string;
  headline: string;
  bio: string;
};

export const creators: Creator[] = [
  {
    id: "amara-chen",
    slug: "amara-chen",
    name: "Amara Chen",
    headline: "Frontend Engineer & Educator",
    bio: "Ten years building interfaces at scale, now teaching what actually matters on the job.",
  },
  {
    id: "dev-osei",
    slug: "dev-osei",
    name: "Dev Osei",
    headline: "Staff Engineer",
    bio: "Focused on type-safe systems and developer tooling.",
  },
  {
    id: "priya-nair",
    slug: "priya-nair",
    name: "Priya Nair",
    headline: "Distributed Systems Lead",
    bio: "Designs backend systems for products used by millions.",
  },
];
