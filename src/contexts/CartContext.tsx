"use client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, ReactNode } from "react";
import { Store } from "../data/types/store";
import { useAuthProvider } from "./AuthContext";
import { Cart } from "../data/types/cart";

interface CartContextProps {
  cart: Cart | undefined;
  isLoading: boolean;
  error: any;
  refetchCart: () => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { user } = useAuthProvider();

  const { data, isLoading, error, refetch } = useQuery<Cart>({
    queryKey: ["cart", user?.cart.id],
    queryFn: () =>
      fetch(`http://127.0.0.1:3000/carts/${user?.cart.id}`).then((res) =>
        res.json()
      ),
    enabled: !!user?.cart.id,
    refetchOnMount: true,
  });

  const value: CartContextProps = {
    cart: data,
    isLoading,
    error,
    refetchCart: refetch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

export const useCartProvider = () => useContext(CartContext);
