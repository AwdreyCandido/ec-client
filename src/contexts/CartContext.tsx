"use client";
import { useQuery } from "@tanstack/react-query";
import { JSX, createContext, useContext } from "react";
import { Store } from "../data/types/store";

interface CartContextProps {
  stores: Store[] | undefined;
  isLoading: boolean;
  error: any;
}

const CartContext = createContext({} as CartContextProps);

interface CartProviderProps {
  children: JSX.Element;
}

export const CartProvider = ({ children }: CartProviderProps) => {


  
  const value = {} as CartContextProps;

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

export const useCartProvider = () => useContext(CartContext);
