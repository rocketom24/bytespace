export default async function CreatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return null;
}
