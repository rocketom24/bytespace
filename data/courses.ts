export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationMinutes: number;
  lessonCount: number;
  creatorId: string;
  rating: number;
  studentCount: number;
  coverColor: string;
};

export const courses: Course[] = [
  {
    id: "1",
    slug: "react-fundamentals",
    title: "React Fundamentals",
    summary: "Build modern interfaces with components, state, and hooks.",
    category: "Web Development",
    level: "Beginner",
    durationMinutes: 320,
    lessonCount: 3,
    creatorId: "amara-chen",
    rating: 4.8,
    studentCount: 12400,
    coverColor: "#88BDA4",
  },
  {
    id: "2",
    slug: "typescript-in-depth",
    title: "TypeScript In Depth",
    summary: "Type systems, generics, and safer large-scale apps.",
    category: "Programming Languages",
    level: "Intermediate",
    durationMinutes: 410,
    lessonCount: 2,
    creatorId: "dev-osei",
    rating: 4.9,
    studentCount: 8700,
    coverColor: "#659287",
  },
  {
    id: "3",
    slug: "systems-design-basics",
    title: "Systems Design Basics",
    summary: "Scalability, caching, and distributed data fundamentals.",
    category: "Computer Science",
    level: "Advanced",
    durationMinutes: 500,
    lessonCount: 1,
    creatorId: "priya-nair",
    rating: 4.7,
    studentCount: 5300,
    coverColor: "#B1D3B9",
  },
];
