"use client";

import React, { useState } from "react";
import TextInput from "@/src/components/ui/inputs/TextInput";
import { useRouter } from "next/navigation";
import { FiLogIn } from "react-icons/fi";

interface LoginData {
  email: string | null;
  password: string | null;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = () => {
    console.log(loginData);
    // router.replace("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 flex flex-col">
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-[35rem] bg-white rounded-2xl shadow-md p-10 border border-gray-100">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Bem-vindo de volta!
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Faça login para continuar suas compras
            </p>
          </div>

          <div className="space-y-5">
            <TextInput
              id="email"
              name="email"
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              value={loginData.email || ""}
              onChange={handleLoginForm}
            />

            <TextInput
              id="password"
              name="password"
              type="password"
              label="Senha"
              placeholder="••••••••"
              value={loginData.password || ""}
              onChange={handleLoginForm}
            />

            <div className="flex items-center space-x-2 mt-1">
              <input
                id="remember"
                type="checkbox"
                className="accent-blue-600 border-gray-300"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>

            <button
              onClick={submitForm}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
            >
              <FiLogIn size={18} />
              Entrar
            </button>

            <p className="text-center text-gray-700 text-base mt-4">
              Não tem uma conta?{" "}
              <a
                href="/auth/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
