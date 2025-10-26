"use client";
import { useStoresProvider } from "@/src/contexts/StoresContext";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { addItemToCart } from "@/src/services/cart";
import { useQueryClient } from "@tanstack/react-query";
import HeroSection from "../components/custom/home/hero-setion/HeroSection";
import StoreList from "../components/custom/home/store-list/StoreList";

export default function Home() {
  const { stores, isLoading, error } = useStoresProvider();
  const { user } = useAuthProvider();
  const queryClient = useQueryClient();

  const handleAddCartItem = async (storeId: number, productId: number) => {
    if (!user) return alert("Faça login primeiro!");
    const response = await addItemToCart({
      cartId: user.cart.id,
      productId,
    });
    queryClient.invalidateQueries(["cart", user?.cart.id] as any); // Gambiarra
    console.log("add item", response);
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="flex flex-col items-center min-h-screen bg-background">
      <HeroSection />
      {isLoading ? (
        <p>Loading...</p> // mudar dps
      ) : (
        <StoreList stores={stores || []} onAddToCart={handleAddCartItem} />
      )}
    </main>
  );
}
