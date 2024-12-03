  export default async function City({
    params,
  }: {
    params: Promise<{ blogId: string }>
  }) {
    return await params;
  }