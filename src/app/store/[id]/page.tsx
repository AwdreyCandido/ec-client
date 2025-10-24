import { stores } from "@/src/data/placeholder";
import Image from "next/image";
import Link from "next/link";

export default async function StoreDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = stores.find((store) => store.id === +id);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <section className="w-full flex justify-center px-8 md:px-20 pt-[15rem] pb-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-b-3xl shadow-sm">
        <div className="w-[80vw] flex flex-col items-center text-center space-y-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
            <Image
              src={store.logoUrl}
              alt={store.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900">
            {store.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">{store.description}</p>
          <p className="text-base text-gray-500">⭐ {store.ratings} / 5.0</p>
          <div className="flex gap-4 text-gray-700">
            <span>📧 {store.email}</span>
            <span>📞 {store.phone}</span>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center bg-background">
        <div className="w-[80vw] max-w-[80vw]  py-20 space-y-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Produtos</h3>
          {store.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {store.products.map((product: any) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div
                    key={product.id}
                    className="group overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative rounded-2xl w-full h-56 flex items-center justify-center bg-gray-50 overflow-hidden ">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={200}
                        height={240}
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        {store.name}
                      </span>
                    </div>

                    <div className="py-5 flex flex-col h-48">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600">
                        {product.name}
                      </h4>
                      <p className="text-gray-500 text-base line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-blue-700 font-bold text-xl">
                          R$ {Number(product.price).toFixed(2)}
                        </span>
                        <button className="bg-blue-600 text-white text-base font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Nenhum produto disponível.</p>
          )}
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
