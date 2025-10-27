"use client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, ReactNode } from "react";
import { useAuthProvider } from "./AuthContext";
import { API_PATH } from "../utils/constants";
import { OrderGroupType } from "../data/types/order-group";

interface OrdersContextProps {
  orders: OrderGroupType[] | undefined;
  isLoading: boolean;
  error: any;
  refetchOrders: () => void;
}

const OrdersContext = createContext<OrdersContextProps>(
  {} as OrdersContextProps
);

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const { user } = useAuthProvider();

  const { data, isLoading, error, refetch: refetchOrders} = useQuery<OrderGroupType[]>({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const res = await fetch(`${API_PATH}/orders/${user?.id}`);
      return res.json();
    },
    enabled: !!user?.id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const value: OrdersContextProps = {
    orders: data,
    isLoading,
    error,
    refetchOrders,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

export const useOrdersProvider = () => useContext(OrdersContext);
