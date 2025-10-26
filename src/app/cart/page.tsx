"use client";
import { useState, useEffect } from "react";
import { useCartProvider } from "@/src/contexts/CartContext";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { createOrder, transformCartToOrders } from "@/src/services/cart";
import CartTabs from "@/src/components/custom/cart/cart-tabs/CartTabs";
import CartSection from "@/src/components/custom/cart/cart-section/CartSection";
import OrdersSection from "@/src/components/custom/cart/orders-section/OrdersSection";

export default function CartPage() {
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");
  const { cart, isLoading, error, refetchCart } = useCartProvider();
  const { user } = useAuthProvider();

  console.log(cart, isLoading, error);
  if (isLoading) return <p>Loading...</p>;
  if (error || !cart) return <p>Error: {error?.message}</p>;

  const subtotal = (cart?.items ?? []).reduce(
    (sum, item) => sum + parseFloat(item.totalPrice),
    0
  );

  const handleCreateOrder = async () => {
    if (!user) return;
    const orders = transformCartToOrders(cart, user.id);
    const response = await createOrder(user.id, orders);
    if (!response.message) {
      refetchCart();
      alert("Pedido criado com sucesso!");
    } else {
      console.log("Order error:", response?.message);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col items-center pt-[15rem] min-h-screen">
        <CartTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <section className="w-full flex justify-center pt-10 pb-24">
          {activeTab === "cart" ? (
            <CartSection
              cart={cart}
              subtotal={subtotal}
              refetchCart={refetchCart}
              handleCreateOrder={handleCreateOrder}
            />
          ) : (
            <OrdersSection orders={[]} />
          )}
        </section>
      </div>
    </main>
  );
}
