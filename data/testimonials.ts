export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  stat: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Finally a course platform that explains the why, not just the how. I went from tutorials to shipping real features.",
    author: "Jonas M.",
    role: "Career switcher",
    rating: 5,
    stat: "Hired as a frontend developer 3 months after finishing",
  },
  {
    id: "t2",
    quote:
      "The pacing respects my time. I learn on my commute and still finish courses faster than anywhere else I've tried.",
    author: "Sara K.",
    role: "Backend Engineer",
    rating: 5,
    stat: "Completed 4 courses in 6 months",
  },
  {
    id: "t3",
    quote:
      "Teaching on ByteSpace let me turn what I already knew into a real second income, without dealing with any of the platform overhead myself.",
    author: "Amara Chen",
    role: "Course Creator",
    rating: 5,
    stat: "12,000+ students taught",
  },
];
