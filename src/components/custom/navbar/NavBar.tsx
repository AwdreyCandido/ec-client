"use client";
import React from "react";
import { FiUser } from "react-icons/fi";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";

const NavBar: React.FC = () => {
  const { user, logout } = useAuthProvider();

  return (
    <header className="w-[80vw] bg-white py-8 px-8 flex justify-between items-center absolute top-10 z-50 backdrop-blur-md left-[50%] -translate-x-[50%] rounded-4xl shadow-md">
      <h1 className="text-2xl font-extrabold text-gray-900 tracking-wide">
        Ecommerce
      </h1>

      <nav className="flex items-center gap-20">
        <div className="flex text-button gap-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-secondary transition">
            Início
          </a>
          <a href="#stores" className="hover:text-secondary transition">
            Lojas
          </a>
          <a href="#contact" className="hover:text-secondary transition">
            Contato
          </a>
        </div>

        {!user ? (
          <div className="flex gap-4 ml-6">
            <Link
              href="/auth/login"
              className="bg-secondary text-white font-medium px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="border border-secondary text-secondary font-medium px-6 py-2 rounded-xl hover:bg-blue-50 transition"
            >
              Cadastrar
            </Link>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link href="/cart">
              <div
                className="w-[3.5rem] h-[3.5rem] flex items-center justify-center border-secondary text-secondary p-2 rounded-full bg-secondary-light hover:text-white hover:bg-secondary transition duration-300  cursor-pointer"
                title="Adicionar ao carrinho"
              >
                <HiOutlineShoppingCart className="stroke-2" size={20} />
              </div>
            </Link>
            <Link href="/profile">
              <div
                className="w-[3.5rem] h-[3.5rem] flex items-center justify-center text-secondary p-2 rounded-full border-2 border-secondary-light hover:text-secondary-light hover:border-secondary hover:bg-secondary transition duration-300 cursor-pointer"
                title="Perfil"
              >
                <FiUser className="text-xl" />
              </div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
