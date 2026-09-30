export type Review = {
  id: string;
  courseId: string;
  author: string;
  rating: number;
  quote: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    courseId: "1",
    author: "Jonas M.",
    rating: 5,
    quote: "Finally a React course that explains the why, not just the how.",
  },
  {
    id: "r2",
    courseId: "2",
    author: "Sara K.",
    rating: 5,
    quote: "The generics section alone was worth the price.",
  },
  {
    id: "r3",
    courseId: "3",
    author: "Malik T.",
    rating: 4,
    quote: "Dense but thorough — took my system design interviews seriously.",
  },
];
