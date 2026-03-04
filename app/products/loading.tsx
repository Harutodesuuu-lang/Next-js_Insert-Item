import { SkeletonCard } from "@/components/i-skeleton/skeleton-card";

export default function ProductLoading() {
  return (
    <main className="container mx-auto">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
        {
          /* {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))} */

          [...Array(15)].map((_, index) => (
            <SkeletonCard key={index} />
          ))
        }
      </section>
    </main>
  );
}
