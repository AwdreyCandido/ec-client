import { products } from "@/src/data/placeholder";
import Image from "next/image";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((store) => store.id === +id);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <section className="w-[80vw] max-w-[80vw] py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-[5rem]">
          <div className="bg-white p-10 rounded-2xl shadow-md flex justify-center items-center">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900">
              {product.name}
            </h2>
            <p className="text-gray-600 text-lg">{product.description}</p>
            <p className="text-blue-700 text-3xl font-bold">
              R$ {Number(product.price).toFixed(2)}
            </p>
            <p className="text-gray-500 text-base">
              Estoque disponível: {product.stock}
            </p>
            <button className="bg-blue-600 text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition">
              Comprar agora
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Avaliações</h3>
          <div className="space-y-6">
            {product.reviews.map((review: any) => (
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

      <footer className="w-full bg-gray-900 text-gray-300 text-center py-8">
        <p>
          © {new Date().getFullYear()} Ecommerce. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
