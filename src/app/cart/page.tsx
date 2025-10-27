"use client";
import { useState } from "react";
import { useCartProvider } from "@/src/contexts/CartContext";
import { useOrdersProvider } from "@/src/contexts/OrdersContext";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { createOrder, transformCartToOrders } from "@/src/services/cart";
import {
  notifyError,
  notifySuccess,
} from "@/src/components/custom/notifications/Notifications";
import { createPaymentIntent } from "@/src/services/payment";
import CartTabs from "@/src/components/custom/cart/cart-tabs/CartTabs";
import CartSection from "@/src/components/custom/cart/cart-section/CartSection";
import OrdersSection from "@/src/components/custom/cart/orders-section/OrdersSection";
import PageLoading from "@/src/components/custom/loading/PageLoading";

export default function CartPage() {
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const { cart, isLoading, error, refetchCart } = useCartProvider();
  const { user } = useAuthProvider();
  const {
    orders,
    isLoading: loadingOrders,
    refetchOrders,
  } = useOrdersProvider();

  if (isLoading || loadingOrders) return <PageLoading />;
  if (error || !cart)
    return <p>Error: {error?.message ?? "Erro ao carregar o carrinho"}</p>;

  const subtotal = (cart.items ?? []).reduce(
    (sum, item) => sum + parseFloat(item.totalPrice),
    0
  );

  const handleCreateCheckout = async () => {
    if (!user) {
      notifyError("Usuário não autenticado");
      return;
    }

    try {
      const data = await createPaymentIntent({
        amount: Math.round(subtotal * 100),
      });
      console.log(data);
      if (!data.clientSecret) {
        notifyError("Erro ao criar pagamento");
        return;
      }

      setClientSecret(data.clientSecret);
      setShowPaymentForm(true);
    } catch (err: any) {
      console.error(err);
      notifyError("Erro ao processar o pagamento");
    }
  };

  const handleCreateOrder = async () => {
    if (!user) {
      notifyError("Usuário não autenticado");
      return;
    }

    try {
      const ordersData = transformCartToOrders(cart, user.id);
      const response = await createOrder(user.id, ordersData);

      if (response?.message) {
        console.error("Erro ao criar pedido:", response.message);
        notifyError("Erro ao criar pedido");
        return;
      }

      refetchCart();
      refetchOrders();
      notifySuccess("Pedido criado com sucesso!");
      setShowPaymentForm(false);
      setClientSecret(null);
    } catch (err: any) {
      console.error("Erro inesperado ao criar pedido:", err);
      notifyError("Ocorreu um erro ao criar o pedido");
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
              handleCreateCheckout={handleCreateCheckout}
              onCloseModal={() => setShowPaymentForm(false)}
              showPaymentForm={showPaymentForm}
              clientSecret={clientSecret}
            />
          ) : (
            <OrdersSection orders={orders ?? []} />
          )}
        </section>
      </div>
    </main>
  );
}
