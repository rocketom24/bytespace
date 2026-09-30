export type CategoryIcon = "code" | "language" | "systems" | "design" | "data" | "cloud";

export type Category = {
  id: string;
  name: string;
  icon: CategoryIcon;
  courseCount: number;
};

export const categories: Category[] = [
  { id: "web-development", name: "Web Development", icon: "code", courseCount: 128 },
  { id: "programming-languages", name: "Programming Languages", icon: "language", courseCount: 96 },
  { id: "computer-science", name: "Computer Science", icon: "systems", courseCount: 74 },
  { id: "ui-ux-design", name: "UI/UX Design", icon: "design", courseCount: 61 },
  { id: "data-science", name: "Data Science", icon: "data", courseCount: 58 },
  { id: "cloud-devops", name: "Cloud & DevOps", icon: "cloud", courseCount: 45 },
];
