"use client";
import { useQuery } from "@tanstack/react-query";
import { JSX, createContext, useContext } from "react";
import { Store } from "../data/types/store";
import { API_PATH } from "../utils/constants";

interface StoresContextProps {
  stores: Store[] | undefined;
  isLoading: boolean;
  error: any;
}

const StoresContext = createContext({} as StoresContextProps);

interface StoresProviderProps {
  children: JSX.Element;
}

export const StoresProvider = ({ children }: StoresProviderProps) => {
  const { data, isLoading, error } = useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: () => fetch(`${API_PATH}/stores`).then((res) => res.json()),
  });

  const value = {
    stores: data,
    isLoading,
    error,
  } as StoresContextProps;

  console.log("data:", data);

  return (
    <StoresContext.Provider value={value}>{children}</StoresContext.Provider>
  );
};

export default StoresContext;

export const useStoresProvider = () => useContext(StoresContext);
