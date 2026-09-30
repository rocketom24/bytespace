import { CourseSearchExperience } from "@/components/ui/CourseSearchExperience";
import { courses } from "@/data/courses";
import { categories } from "@/data/categories";

export default function AllCoursesPage() {
  return <CourseSearchExperience courses={courses} categories={categories} />;
}
