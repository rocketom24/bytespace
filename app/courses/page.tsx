import { CoursesExperience } from "@/components/ui/CoursesExperience";
import { courses } from "@/data/courses";
import { categories } from "@/data/categories";

export default function CoursesPage() {
  return <CoursesExperience courses={courses} categories={categories} />;
}
