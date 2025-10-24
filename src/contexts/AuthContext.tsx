"use client";
import { useQuery } from "@tanstack/react-query";
import { JSX, createContext, useContext } from "react";
import { Store } from "../data/types/store";
import { User } from "../data/types/user";

interface AuthContextProps {
  stores: Store[] | undefined;
  isLoading: boolean;
  error: any;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {


  
  const value = {} as AuthContextProps;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuthProvider = () => useContext(AuthContext);
