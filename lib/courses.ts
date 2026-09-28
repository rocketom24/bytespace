import { courses, type Course } from "@/data/courses";

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getCoursesByCreatorId(creatorId: string): Course[] {
  return courses.filter((course) => course.creatorId === creatorId);
}
