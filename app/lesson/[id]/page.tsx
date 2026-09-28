export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return null;
}
