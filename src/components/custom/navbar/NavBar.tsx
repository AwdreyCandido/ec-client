"use client";
import React, { useState } from "react";
import { FiMenu, FiUser, FiX } from "react-icons/fi";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";

const NavBar: React.FC = () => {
  const { user, logout } = useAuthProvider();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-[90vw] md:w-[80vw] bg-white py-8 px-8 flex flex-col sm:flex-row justify-between items-center absolute top-10 z-50 backdrop-blur-md left-[50%] -translate-x-[50%] rounded-4xl shadow-md">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
          Ecommerce
        </h1>
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <nav
        className={`flex md:flex-row justify-between items-center gap-4 md:gap-8 w-full md:w-auto mt-5 md:mt-0 transition-all duration-300 ${
          open ? "flex" : "hidden md:flex"
        }`}
      >
        <div className="flex md:flex-row text-button gap-6 md:gap-6 text-gray-700 font-medium items-center justify-center md:justify-start">
          <Link href="/" className="hover:text-secondary transition">
            Início
          </Link>
          <Link href="/F#stores" className="hover:text-secondary transition">
            Lojas
          </Link>
        </div>

        {!user ? (
          <div className="flex md:flex-row gap-4 md:gap-4 mt-2 md:mt-0 items-center justify-center md:justify-start">
            <Link
              href="/auth/login"
              className="bg-secondary text-white font-medium px-4 sm:px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="border border-secondary text-secondary font-medium px-4 sm:px-6 py-2 rounded-xl hover:bg-blue-50 transition"
            >
              Cadastrar
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 sm:gap-5 mt-2 md:mt-0 items-center justify-center md:justify-start">
            <Link href="/cart">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border-secondary text-secondary p-2 rounded-full bg-secondary-light hover:text-white hover:bg-secondary transition duration-300 cursor-pointer"
                title="Adicionar ao carrinho"
              >
                <HiOutlineShoppingCart className="stroke-2" size={20} />
              </div>
            </Link>
            <Link href="/profile">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-secondary p-2 rounded-full border-2 border-secondary-light hover:text-secondary-light hover:border-secondary hover:bg-secondary transition duration-300 cursor-pointer"
                title="Perfil"
              >
                <FiUser className="text-lg sm:text-xl" />
              </div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
