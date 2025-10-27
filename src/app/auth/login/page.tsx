"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/src/services/auth";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { User } from "@/src/data/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";
import InputError from "@/src/components/custom/input-error/InputError";
import TextInput from "@/src/components/ui/inputs/TextInput";
import { notifyError, notifySuccess } from "@/src/components/custom/notifications/Notifications";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(
      8,
      "Mínimo de 8 caracteres, com pelo menos 1 letra, 1 número e 1 caractere especial."
    ),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { saveUser } = useAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginForm = async (data: LoginFormInputs) => {
    const response = await loginUser(data);
    if (response?.id) {
      const user: User = response;
      saveUser(user);
      router.replace("/");
      notifySuccess("Login realizado com sucesso");
    } else {
      console.log("Login error:", response?.message);
      notifyError("Erro ao realizar login");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-secondary-light from-40% to-secondary rounded-tl-[15rem] rounded-br-[15rem] flex flex-col">
      <main className="flex flex-1 items-center justify-center pt-[15rem] pb-[5rem] px-4">
        <div className="w-full max-w-[35rem] bg-white rounded-2xl shadow-md p-10 border border-gray-100">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Bem-vindo de volta!
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Faça login para continuar suas compras
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLoginForm)} className="space-y-5">
            <div>
              <TextInput
                id="email"
                type="email"
                label="E-mail"
                placeholder="seu@email.com"
                {...register("email")}
              />
              {errors.email && <InputError message={errors.email?.message} />}
            </div>
            <div>
              <TextInput
                id="password"
                type="password"
                label="Senha"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <InputError message={errors.password?.message} />
              )}
            </div>

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

            <PrimaryButton
              title="Entrar"
              type="submit"
              disabled={isSubmitting}
            />

            <p className="text-center text-gray-700 text-base mt-4">
              Não tem uma conta?{" "}
              <a
                href="/auth/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Cadastre-se
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
