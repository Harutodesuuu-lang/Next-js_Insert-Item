import Image from "next/image";
import { Metadata } from "next";
import ProductListClient from "@/component/i-tech-cards/product-lists-client";
import { fetchAllProducts } from "@/lib/data/products";
export const metadata: Metadata = {
  title: "Ishop -Home",
  description: "I shop probode electronic",
};
export default function Home() {
  return (
    <main>
      <ProductListClient fetchProducts={fetchAllProducts()} />
    </main>
  );
}
