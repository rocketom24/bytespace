export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return null;
}
