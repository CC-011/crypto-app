export default async function City({
  params,
}: {
  params: Promise<{ cityId: string }>
}) {
  return await params;
}
