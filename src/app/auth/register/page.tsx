"use client";

import { useRouter } from "next/navigation";
import { registerUser } from "@/src/services/auth";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { User } from "@/src/data/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";
import InputError from "@/src/components/custom/input-error/InputError";
import TextInput from "@/src/components/ui/inputs/TextInput";
import { notifySuccess } from "@/src/components/custom/notifications/Notifications";

const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(
        8,
        "Mínimo de 8 caracteres, com pelo menos 1 letra, 1 número e 1 caractere especial."
      ),
    confirmPassword: z.string().min(8, "Confirmação de senha inválida"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const { saveUser } = useAuthProvider();

  const handleRegisterForm = async (data: RegisterFormInputs) => {
    const response = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response?.id) {
      const user: User = response;
      saveUser(user);
      router.replace("/");
      notifySuccess("Registro realizado com sucesso");
    } else {
      console.log("Register error:", response?.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tl from-secondary-light from-40% to-secondary rounded-tr-[15rem] rounded-bl-[15rem] flex flex-col">
      <main className="flex flex-1 items-center justify-center pt-[15rem] pb-[5rem] px-4">
        <div className="w-full max-w-[35rem] bg-white rounded-2xl shadow-md p-10 border border-gray-100">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Crie sua conta
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Preencha os dados abaixo para se registrar
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegisterForm)}
            className="space-y-5"
          >
            <div>
              <TextInput
                id="name"
                label="Nome completo"
                placeholder="Seu nome"
                {...register("name")}
              />
              {errors.name && <InputError message={errors.name?.message} />}
            </div>

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

            <div>
              <TextInput
                id="confirmPassword"
                label="Confirmar Senha"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <InputError message={errors.confirmPassword?.message} />
              )}
            </div>

            <div className="mt-10">
              <PrimaryButton
                title="Cadastrar"
                type="submit"
                disabled={isSubmitting}
              />
            </div>

            <p className="text-center text-gray-700 text-base mt-4">
              Já tem uma conta?{" "}
              <a
                href="/auth/login"
                className="text-secondary hover:underline font-medium"
              >
                Entrar
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
