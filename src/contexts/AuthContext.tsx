"use client";
import { JSX, createContext, useContext, useEffect, useState } from "react";
import { User } from "../data/types/user";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  saveUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: JSX.Element;
}

export const saveUsertoLocalStorage = (user: User, token?: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const getUserFromLocalStorage = (): User | null => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

export const clearLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getToken = (): string | null => localStorage.getItem("token");

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = getUserFromLocalStorage();
    setUser(stored)
  }, []);

  const saveUser = (userData: User) => {
    setUser(userData);
    saveUsertoLocalStorage(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value: AuthContextProps = {
    user,
    token,
    saveUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuthProvider = () => useContext(AuthContext);
