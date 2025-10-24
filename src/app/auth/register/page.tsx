"use client";

import React, { useState } from "react";
import TextInput from "@/src/components/ui/inputs/TextInput";
import { useRouter } from "next/navigation";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleRegisterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = () => {
    console.log(registerData);
    // router.replace("/auth/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 flex flex-col">
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-[35rem] bg-white rounded-2xl shadow-md p-10 border border-gray-100">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Crie sua conta
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Preencha os dados abaixo para se registrar
            </p>
          </div>

          <div className="space-y-5">
            <TextInput
              id="name"
              name="name"
              label="Nome completo"
              placeholder="Seu nome"
              value={registerData.name}
              onChange={handleRegisterForm}
            />

            <TextInput
              id="email"
              name="email"
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              value={registerData.email}
              onChange={handleRegisterForm}
            />

            <TextInput
              id="password"
              name="password"
              type="password"
              label="Senha"
              placeholder="••••••••"
              value={registerData.password}
              onChange={handleRegisterForm}
            />

            <button
              onClick={submitForm}
              className="w-full bg-secondary hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition"
            >
              Cadastrar
            </button>

            <p className="text-center text-gray-700 text-base mt-4">
              Já tem uma conta?{" "}
              <a
                href="/auth/login"
                className="text-secondary hover:underline font-medium"
              >
                Entrar
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
