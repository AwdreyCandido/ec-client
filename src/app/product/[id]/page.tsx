"use client";
import Image from "next/image";
import { useStoresProvider } from "@/src/contexts/StoresContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/src/data/types/product";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails() {
  // const [product, setProduct] = useState<Product | undefined>();
  const { id } = useParams<{ id: string }>();
  const { stores } = useStoresProvider();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["stores"],
    queryFn: () =>
      fetch(`http://127.0.0.1:3000/products/${id}`).then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(product, "prod");

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <section className="w-[80vw] max-w-[80vw] py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-[5rem]">
          <div className="relative overflow-hidden w-[60rem] h-[38rem] bg-white rounded-2xl shadow-md flex justify-center items-center">
            <Image
              src={product?.imageUrl}
              alt={product?.name}
              fill
              className="object-contain scale-[1.05]"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900">
              {product?.name}
            </h2>
            <p className="text-gray-600 text-lg">{product?.description}</p>
            <p className="text-blue-700 text-3xl font-bold">
              R$ {Number(product?.price).toFixed(2)}
            </p>
            <p className="text-gray-500 text-base">
              Estoque disponível: {product?.stock}
            </p>
            <button className="bg-blue-600 text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition">
              Comprar agora
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Avaliações</h3>
          <div className="space-y-6">
            {product?.reviews?.map((review: any) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="text-yellow-500 font-semibold mb-2">
                  ⭐ {review.rating}/5
                </p>
                <p className="text-gray-700 text-base">{review.comment}</p>
                <p className="text-gray-400 text-sm mt-2">
                  {new Date(review.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
