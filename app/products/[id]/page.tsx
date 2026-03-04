import { ProductResponse } from "@/lib/type/product";
import Image from "next/image";

//function to get product by p_id
async function getProductById(id: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/products/${id}`,
  );
  const product: ProductResponse = await data.json();
  return product;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //handle data from promise
  const { id } = await params;

  //received product data
  const product: ProductResponse = await getProductById(id);
  // console.log("product", product);

  return (
    <main>
      <section>
        <h1 className="text-center">Product Detail Page {id}</h1>
        <h2>{product.id}</h2>
        <h2>{product.title}</h2>
        <h2>{product.slug}</h2>
        <Image
          src={product.images[0]}
          alt="product.img"
          width={500}
          height={500}
        />
        <h2>{product.price}</h2>
        <h2>{product.description}</h2>
      </section>
    </main>
  );
}
