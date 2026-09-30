export type PlatformStat = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export const stats: PlatformStat[] = [
  { id: "learners", label: "Active learners", value: 52000, suffix: "+" },
  { id: "courses", label: "Courses published", value: 1240, suffix: "+" },
  { id: "creators", label: "Expert creators", value: 180, suffix: "+" },
  { id: "payouts", label: "Paid to creators", value: 2.4, prefix: "$", suffix: "M+" },
];
