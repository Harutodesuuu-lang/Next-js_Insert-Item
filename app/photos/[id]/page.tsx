export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-2/4 h-50 bg-gray-300 flex justify-center items-center text-black">
      Hello {id}
    </div>
  );
}
