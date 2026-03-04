"use client";

import { fetchAllProducts } from "@/lib/data/products";
import { ProductResponse } from "@/lib/type/product";
import { use } from "react";
import { ProductCard } from "@/component/i-tech-cards/product-card";
import Link from "next/link";

export default function ProductListClient({
  fetchProducts,
}: {
  fetchProducts: Promise<ProductResponse[]>;
}) {
  //received data from server to client
  const products = use(fetchProducts);
  return (
    <main className="container mx-auto">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <Link href={`/products/${product.id}`} key={index}>
            <ProductCard
              key={index}
              images={[product.images[0]]}
              title={product.title}
              description={product.description}
              price={`${product.price} USD`}
            />
          </Link>
        ))}
      </section>
    </main>
  );
}
