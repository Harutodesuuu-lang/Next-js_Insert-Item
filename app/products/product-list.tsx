import { ProductCard } from "@/component/i-tech-cards/product-card";
import Link from "next/link";

// declear function to use api
const BASE_URL = process.env.NEXT_PUBLIC_API;

async function loadProduct() {
  const response = await fetch(`${BASE_URL}/api/v1/products`, {
    method: "GET",
  });
  const products = await response.json();
  return products;
}

export default async function ProductList() {
  const products = await loadProduct();
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
