export type CourseFormat = "Video" | "Live" | "Text";

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
  price: number;
  commentCount: number;
  format: CourseFormat;
  language: string;
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
    price: 49,
    commentCount: 342,
    format: "Video",
    language: "English",
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
    price: 59,
    commentCount: 210,
    format: "Video",
    language: "English",
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
    price: 79,
    commentCount: 128,
    format: "Live",
    language: "English",
  },
  {
    id: "4",
    slug: "ui-ux-design-foundations",
    title: "UI/UX Design Foundations",
    summary: "Wireframes, prototyping, and design systems from scratch.",
    category: "UI/UX Design",
    level: "Beginner",
    durationMinutes: 280,
    lessonCount: 4,
    creatorId: "amara-chen",
    rating: 4.6,
    studentCount: 9100,
    coverColor: "#B1D3B9",
    price: 0,
    commentCount: 189,
    format: "Video",
    language: "English",
  },
  {
    id: "5",
    slug: "applied-data-science",
    title: "Applied Data Science",
    summary: "Pandas, visualization, and real-world modeling workflows.",
    category: "Data Science",
    level: "Intermediate",
    durationMinutes: 360,
    lessonCount: 5,
    creatorId: "priya-nair",
    rating: 4.5,
    studentCount: 6200,
    coverColor: "#88BDA4",
    price: 69,
    commentCount: 154,
    format: "Text",
    language: "Spanish",
  },
  {
    id: "6",
    slug: "cloud-devops-essentials",
    title: "Cloud & DevOps Essentials",
    summary: "CI/CD pipelines, containers, and infrastructure as code.",
    category: "Cloud & DevOps",
    level: "Advanced",
    durationMinutes: 450,
    lessonCount: 3,
    creatorId: "dev-osei",
    rating: 4.8,
    studentCount: 4100,
    coverColor: "#B1D3B9",
    price: 89,
    commentCount: 97,
    format: "Live",
    language: "French",
  },
  {
    id: "7",
    slug: "productivity-systems-that-stick",
    title: "Productivity Systems That Stick",
    summary: "Build habits, routines, and task workflows that survive a busy week.",
    category: "Productivity",
    level: "Beginner",
    durationMinutes: 240,
    lessonCount: 4,
    creatorId: "amara-chen",
    rating: 4.7,
    studentCount: 7600,
    coverColor: "#659287",
    price: 39,
    commentCount: 176,
    format: "Video",
    language: "English",
  },
];
