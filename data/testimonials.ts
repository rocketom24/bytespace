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
  {
    id: "t4",
    quote:
      "I'd bounced off three other platforms before this one. The project-based courses finally made things click.",
    author: "Devon Rhys",
    role: "Product Designer",
    rating: 5,
    stat: "Shipped first side project in week 2",
  },
  {
    id: "t5",
    quote:
      "The creator tools are genuinely good. Uploading, pricing, and answering student questions all live in one clean dashboard.",
    author: "Priya Nandakumar",
    role: "Course Creator",
    rating: 5,
    stat: "Runs 6 courses solo",
  },
  {
    id: "t6",
    quote:
      "Short lessons, real projects, no fluff. I stopped hoarding tutorials and actually started building.",
    author: "Marcus Lee",
    role: "Self-taught developer",
    rating: 5,
    stat: "Finished bootcamp track in 5 weeks",
  },
  {
    id: "t7",
    quote:
      "Switching careers at 34 felt risky. ByteSpace's mentor office hours made it feel a lot less lonely.",
    author: "Elena Voss",
    role: "Career switcher",
    rating: 5,
    stat: "Landed first dev role at 35",
  },
  {
    id: "t8",
    quote:
      "The community around each course is what keeps me coming back — real feedback, not just a comment section.",
    author: "Tobi Adeyemi",
    role: "Data Analyst",
    rating: 5,
    stat: "Completed 3 courses back to back",
  },
  {
    id: "t9",
    quote:
      "I priced my course myself, kept most of the revenue, and had my first sale within a day of publishing.",
    author: "Han Suri",
    role: "Course Creator",
    rating: 5,
    stat: "8,500+ students taught",
  },
];
