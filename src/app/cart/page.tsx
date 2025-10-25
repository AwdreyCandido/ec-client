"use client";
import Image from "next/image";
import { useCartProvider } from "@/src/contexts/CartContext";
import { FiTrash2, FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";
import { removeCartItem } from "@/src/services/cart";

/export default function CartPage() {
  const { cart, isLoading, error, refetchCart } = useCartProvider();

  if (isLoading) return <p>Loading...</p>;
  if (error || !cart) return <p>Error: {error?.message}</p>;

  const subtotal =
    cart?.items.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0) ||
    0;

  const handleRemoveItem = async (itemId: number) => {
    const response = await removeCartItem(itemId);
    if (!response.message) {
      refetchCart();
    } else {
      console.error("Erro ao remover item:", response.message);
    }
  };

  const handleUpdateQuantity = async (itemId: number, change: number) => {
    const item = cart.items.find((item) => item.id === itemId);
    if (!item) return;

    // amanha eu termino
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <section className="w-full h-full flex justify-center pt-[15rem] pb-24">
        <div className="w-[80vw] max-w-[80vw] grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-10 h-fit">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FiShoppingCart className="text-blue-600" /> Seu Carrinho
            </h2>

            {cart.items.length > 0 ? (
              <div className="space-y-8">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between not-last:border-b border-gray-200 pb-6"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-[7.3rem] h-[7.3rem] rounded-xl overflow-hidden bg-gray-300 flex items-center justify-center">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          width={96}
                          height={96}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-500 text-base line-clamp-1 max-w-[20rem]">
                          {item.product.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="bg-gray-300 hover:bg-gray-200 p-2 rounded-lg transition"
                          >
                            <FiMinus className="text-gray-700" />
                          </button>
                          <span className="text-gray-800 font-medium text-lg">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, +1)}
                            className="bg-gray-300 hover:bg-gray-200 p-2 rounded-lg transition"
                          >
                            <FiPlus className="text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-left w-[16rem]">
                      <p className="text-large font-semibold text-blue-700">
                        R$ {parseFloat(item.totalPrice).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="mt-3 text-red-500 hover:text-red-700 transition flex items-center gap-1 justify-end"
                      >
                        <FiTrash2 /> Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <FiShoppingCart size={48} className="mx-auto mb-4" />
                <p>Seu carrinho está vazio 😢</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 h-fit">
            <h3 className="text-subheading font-semibold text-gray-900 mb-6">
              Resumo da compra
            </h3>
            <div className="space-y-4 text-base text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>R$ 0,00</span>
              </div>
              <div className="border-t border-gray-200 my-4 mt-[5rem]"></div>
              <div className="flex justify-between font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl text-button font-semibold shadow hover:bg-blue-700 hover:scale-105 transition">
              Finalizar compra
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
