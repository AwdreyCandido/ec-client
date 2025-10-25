"use client";
import Image from "next/image";
import Link from "next/link";
import { TbShoppingBagPlus } from "react-icons/tb";
import { useStoresProvider } from "../contexts/StoresContext";
import { addItemToCart } from "../services/cart";
import { useAuthProvider } from "../contexts/AuthContext";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const { stores, isLoading, error } = useStoresProvider();
  const { user } = useAuthProvider();
  const queryClient = useQueryClient();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <section className="w-full flex justify-center px-8 md:px-20 py-36 bg-linear-to-r from-blue-50 to-blue-100 pt-[15rem] rounded-b-3xl shadow-sm">
        <div className="w-[80vw] max-w-[80vw] flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 flex justify-center">
            <div className="w-[50rem] h-[40rem] ">
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Encontre tudo o que você precisa em um só lugar!
              </h2>
              <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-lg">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
                cumque, rem accusamus natus
              </p>
              <button className="bg-secondary text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition transform font-semibold">
                Explorar lojas
              </button>
            </div>
          </div>
          <div className="flex-1 mt-12 md:mt-0 flex justify-center">
            <Image
              src="/assets/placeholder.png"
              alt="Compras online"
              width={500}
              height={400}
              className="rounded-xl shadow-sm bg-white"
            />
          </div>
        </div>
      </section>

      <section id="stores" className="w-full flex justify-center bg-background">
        <div className="w-[80vw] max-w-[80vw] px-8 md:px-20 py-24 space-y-28">
          {stores?.map((store) => (
            <div key={store.id} className="space-y-10">
              <div className="flex items-center gap-6">
                <Link href={`/store/${store.id}`}>
                  <div className="w-[10rem] h-[10rem] rounded-full overflow-hidden border-4 border-blue-600 shadow-md">
                    <Image
                      src={store.logoUrl}
                      alt={store.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div>
                  <h3 className="text-subheading font-bold text-secondary">
                    {store.name}
                  </h3>
                  <p className="text-gray-600">{store.description}</p>
                  <p className="text-base text-gray-500 mt-1">
                    ⭐ {store.ratings} / 5.0
                  </p>
                </div>
              </div>

              {store.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                  {store.products.map((product) => (
                    <div
                      key={product.id}
                      className="group overflow-hidden transition-all duration-300 select-none"
                    >
                      <Link key={product.id} href={`/product/${product.id}`}>
                        <div className="relative rounded-2xl w-full h-56 flex items-center justify-center bg-gray-50 overflow-hidden cursor-pointer">
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
                      </Link>

                      <div className="py-5 flex flex-col">
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
                          <button
                            onClick={async () => {
                              if (!user) return alert("Faça login primeiro!");
                              const response = await addItemToCart({
                                cartId: user.cart.id,
                                productId: product.id,
                              });
                             queryClient.invalidateQueries(["cart", user?.cart.id]);
                              console.log("add item", response);
                            }}
                            className="w-[3.5rem] h-[3.5rem] flex items-center justify-center border-secondary text-secondary p-2 rounded-full bg-secondary-light hover:text-white hover:bg-secondary transition duration-300 shadow-md hover:shadow-none"
                            title="Adicionar ao carrinho"
                          >
                            <TbShoppingBagPlus className="stroke-2" size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Nenhum produto disponível.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
