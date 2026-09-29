import { courses, type Course } from "@/data/courses";
import { creators } from "@/data/creators";

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getCoursesByCreatorId(creatorId: string): Course[] {
  return courses.filter((course) => course.creatorId === creatorId);
}

export function searchCourses(pool: Course[], query: string): Course[] {
  const value = query.trim().toLowerCase();
  if (!value) return [];
  return pool
    .map((course) => {
      const creatorName = creators.find((creator) => creator.id === course.creatorId)?.name ?? "";
      let score = 0;
      if (course.title.toLowerCase().includes(value)) score += 4;
      if (course.category.toLowerCase().includes(value)) score += 2;
      if (creatorName.toLowerCase().includes(value)) score += 2;
      if (course.summary.toLowerCase().includes(value)) score += 1;
      return { course, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.course.studentCount - a.course.studentCount)
    .map((entry) => entry.course);
}

export type CourseSort = "relevance" | "rating" | "newest" | "priceAsc" | "durationAsc";

export const COURSE_SORT_OPTIONS: { id: CourseSort; label: string }[] = [
  { id: "relevance", label: "Relevance" },
  { id: "rating", label: "Rating" },
  { id: "newest", label: "Newest" },
  { id: "priceAsc", label: "Price: Low to High" },
  { id: "durationAsc", label: "Duration: Shortest first" },
];

export function sortCourses(pool: Course[], sort: CourseSort): Course[] {
  if (sort === "relevance") return pool;
  const sorted = [...pool];
  switch (sort) {
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      // ponytail: no createdAt field on Course; id order is the insertion order, used as a recency proxy.
      sorted.sort((a, b) => Number(b.id) - Number(a.id));
      break;
    case "priceAsc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "durationAsc":
      sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
      break;
  }
  return sorted;
}
