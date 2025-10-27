"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { HiOutlinePencilSquare, HiXMark } from "react-icons/hi2";
import { updateUser, UpdateUserDto } from "@/src/services/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextInput from "@/src/components/ui/inputs/TextInput";
import InputError from "@/src/components/custom/input-error/InputError";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";
import {
  notifyError,
  notifySuccess,
} from "@/src/components/custom/notifications/Notifications";

const profileSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  address: z.string().optional(),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

const userIcon =
  "https://i.pinimg.com/736x/20/05/e2/2005e27a39fa5f6d97b2e0a95233b2be.jpg";

export default function ProfilePage() {
  const { user, logout, updateUser: saveUpdatedUser } = useAuthProvider();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        address: user.address ?? "",
      });
    }
  }, [user, reset]);

  const handleUserData = async (data: ProfileFormInputs) => {
    if (!user) {
      notifyError("Usuário não autenticado.");
      return;
    }

    const response = await updateUser(user.id, data as UpdateUserDto);

    if (response?.id) {
      saveUpdatedUser && saveUpdatedUser(response);
      setIsEditing(false);
      notifySuccess("Usuário atualizado com sucesso");
    } else {
      console.log("Update error:", response?.message);
      notifyError("Erro ao atualizar usuário");
    }
  };

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
    if (!user) notifySuccess("Você foi deslogado");
  };

  if (!user)
    return (
      <main className="flex flex-col font-sora items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray text-base mb-4">Você não está logado.</p>
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-secondary text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Fazer login
        </button>
      </main>
    );

  return (
    <main className="flex flex-col items-center min-h-screen bg-background">
      <section className="flex flex-col pt-[15rem] justify-center w-[80vw] max-w-[80vw] py-20">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-10 rounded-3xl shadow-md mb-10">
          <div className="flex items-center gap-8">
            <div className="relative w-[10rem] h-[10rem] rounded-full overflow-hidden border-4 border-secondary shadow">
              <Image
                src={userIcon}
                alt="Profile"
                fill
                className="object-contain scale-[1.05]"
              />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                Olá, {user.name.split(" ")[0]} 👋
              </h2>
              <p className="text-gray text-base">{user.email}</p>
            </div>
          </div>
          <div className="mt-10 md:mt-0">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-8 py-4 rounded-xl shadow-md hover:bg-red-600 hover:scale-105 transition font-semibold"
            >
              Sair da conta
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-subheading font-bold text-gray-900">
                Informações pessoais
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className={`w-[3.5rem] h-[3.5rem] flex items-center justify-center rounded-full transition duration-300 cursor-pointer ${
                  isEditing
                    ? "bg-danger-light text-danger hover:bg-danger hover:text-white"
                    : "bg-secondary-light text-secondary hover:bg-secondary hover:text-white"
                }`}
              >
                {isEditing ? (
                  <HiXMark size={20} />
                ) : (
                  <HiOutlinePencilSquare size={20} />
                )}
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleUserData)}
              className="flex flex-col space-y-4"
            >
              <div>
                {isEditing ? (
                  <div>
                    <TextInput
                      id="name"
                      label="Nome completo"
                      placeholder="Seu nome"
                      {...register("name")}
                    />
                    {errors.name && (
                      <InputError message={errors.name?.message} />
                    )}
                  </div>
                ) : (
                  <p className="text-gray text-base">{user.name}</p>
                )}
              </div>

              <div>
                {isEditing ? (
                  <div>
                    <TextInput
                      id="email"
                      type="email"
                      label="E-mail"
                      placeholder="seu@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <InputError message={errors.email?.message} />
                    )}
                  </div>
                ) : (
                  <p className="text-gray text-base">{user.email}</p>
                )}
              </div>

              <div>
                {isEditing ? (
                  <div>
                    <TextInput
                      id="address"
                      label="Endereço"
                      placeholder="Rua X, nº 123, Pernambuco"
                      {...register("address")}
                    />
                  </div>
                ) : (
                  <p className="text-gray text-base">
                    {user.address ?? "Não informado"}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="mt-10">
                  <PrimaryButton
                    title="Salvar alterações"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              )}
            </form>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-subheading font-bold text-gray-900 mb-4">
              Histórico
            </h3>
            <p className="text-gray text-base">
              Último login:{" "}
              <span className="font-semibold text-gray-800">
                {new Date().toLocaleDateString("pt-BR")}
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
