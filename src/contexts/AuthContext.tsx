"use client";
import { JSX, createContext, useContext, useEffect, useState } from "react";
import { User } from "../data/types/user";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  saveUser: (user: User, token?: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: JSX.Element;
}

export const saveUsertoLocalStorage = (user: User, token?: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  if (token) localStorage.setItem("token", token);
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
    setUser(stored);
    setToken(getToken());
  }, []);

  const saveUser = (userData: User, tokenData?: string) => {
    setUser(userData);
    if (tokenData) setToken(tokenData);
    saveUsertoLocalStorage(userData, tokenData);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    saveUsertoLocalStorage(updatedUser, token ?? undefined);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearLocalStorage();
  };

  const value: AuthContextProps = {
    user,
    token,
    saveUser,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuthProvider = () => useContext(AuthContext);
