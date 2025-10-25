"use client";
import Image from "next/image";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "@/src/data/types/user";
import { HiOutlinePencilSquare, HiXMark } from "react-icons/hi2";

const userIcon =
  "https://i.pinimg.com/736x/20/05/e2/2005e27a39fa5f6d97b2e0a95233b2be.jpg";

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuthProvider();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState<
    Pick<User, "name" | "email" | "address">
  >({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        address: user.address ?? "",
      });
    }
  }, [user]);

  const handleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (updateUser) updateUser(userData);
    setIsEditing(false);
  };

  if (!user)
    return (
      <main className="flex flex-col font-mono items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray text-base mb-4">Você não está logado.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-secondary text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Fazer login
        </button>
      </main>
    );

  return (
    <main className="flex flex-col items-center min-h-screen bg-background">
      <section className="flex flex-col w-screen h-screen justify-center w-[80vw] max-w-[80vw] py-20">
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
              <p className="text-gray-600 text-base">{user.email}</p>
            </div>
          </div>
          <div className="mt-10 md:mt-0">
            <button
              onClick={() => {
                logout();
                router.replace("/login");
              }}
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
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-[3.5rem] h-[3.5rem] flex items-center justify-center border-secondary text-danger p-2 rounded-full bg-danger-light hover:text-white hover:bg-danger transition duration-300  cursor-pointer"
                >
                  <HiXMark className="stroke-[0.90]" size={20} />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-[3.5rem] h-[3.5rem] flex items-center justify-center border-secondary text-secondary p-2 rounded-full bg-secondary-light hover:text-white hover:bg-secondary transition duration-300  cursor-pointer"
                >
                  <HiOutlinePencilSquare className="stroke-2" size={20} />
                </button>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              <div>
                <label className="font-semibold text-gray-800 text-base mb-1 block">
                  Nome:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleUserData}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                ) : (
                  <p className="text-gray-600 text-base">{user.name}</p>
                )}
              </div>

              <div>
                <label className="font-semibold text-gray-800 text-base mb-1 block">
                  Email:
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleUserData}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                ) : (
                  <p className="text-gray-600 text-base">{user.email}</p>
                )}
              </div>

              <div>
                <label className="font-semibold text-gray-800 text-base mb-1 block">
                  Endereço:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleUserData}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                ) : (
                  <p className="text-gray-600 text-base">
                    {user.address ?? "Não informado"}
                  </p>
                )}
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="bg-secondary text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition font-semibold mt-4"
                >
                  Salvar alterações
                </button>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-subheading font-bold text-gray-900 mb-4">
              Histórico
            </h3>
            <p className="text-gray-600 text-base">
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
