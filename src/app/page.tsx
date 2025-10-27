"use client";
import { useStoresProvider } from "@/src/contexts/StoresContext";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { addItemToCart } from "@/src/services/cart";
import { useQueryClient } from "@tanstack/react-query";
import HeroSection from "../components/custom/home/hero-setion/HeroSection";
import StoreList from "../components/custom/home/store-list/StoreList";
import PageLoading from "../components/custom/loading/PageLoading";
import {
  notifyError,
  notifySuccess,
} from "../components/custom/notifications/Notifications";

export default function Home() {
  const { stores, isLoading, error } = useStoresProvider();
  const { user } = useAuthProvider();
  const queryClient = useQueryClient();

  const handleAddCartItem = async (storeId: number, productId: number) => {
    if (!user) {
      notifyError("Usuário não autenticado");
      return;
    }

    try {
      const response = await addItemToCart({
        cartId: user.cart.id,
        productId,
      });

      queryClient.invalidateQueries(["cart", user.cart.id] as any);
      notifySuccess("Produto adicionado ao carrinho");
      console.log("add item", response);
    } catch (err) {
      console.error(err);
      notifyError("Erro ao adicionar produto ao carrinho");
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="flex flex-col items-center min-h-screen bg-background">
      <HeroSection />
      {isLoading ? (
        <PageLoading />
      ) : (
        <StoreList stores={stores || []} onAddToCart={handleAddCartItem} />
      )}
    </main>
  );
}
