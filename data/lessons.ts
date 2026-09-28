export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  order: number;
  durationMinutes: number;
};

export const lessons: Lesson[] = [
  { id: "1", courseId: "1", title: "Why components?", order: 1, durationMinutes: 12 },
  { id: "2", courseId: "1", title: "State and props", order: 2, durationMinutes: 18 },
  { id: "3", courseId: "1", title: "Handling events", order: 3, durationMinutes: 14 },
  { id: "4", courseId: "2", title: "Why types?", order: 1, durationMinutes: 10 },
  { id: "5", courseId: "2", title: "Generics from scratch", order: 2, durationMinutes: 22 },
  { id: "6", courseId: "3", title: "What is a distributed system?", order: 1, durationMinutes: 16 },
];
