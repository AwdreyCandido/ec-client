"use client";
import Image from "next/image";
import placeholder from "@/public/assets/images/placeholder.png";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";
import HeroGrid from "../hero-grid/HeroGrid";

const HeroSection = () => {
  return (
    <section className="flex h-screen w-full px-8 md:px-20 py-36 bg-linear-to-br from-secondary-light from-40% to-secondary rounded-tl-[15rem] rounded-br-[15rem] pt-[15rem] shadow-sm">
      <div className="w-[80vw] max-w-[80vw] h-full mx-auto grid grid-cols-2 gap-[10rem] items-center">
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl md:text-[5rem] font-sora font-semibold text-gray-900 mb-6 leading-tight">
            <p>Encontre tudo</p>
            <p> o que você precisa </p>
            <p className="font-figtree">em um só Lugar!</p>
          </h2>
          <p className="text-gray-700 text-lg font-sora md:text-button max-w-2xl mb-20">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
            cumque, rem accusamus natus.
          </p>
          <PrimaryButton title="Explorar lojas" />
        </div>

        <HeroGrid />
      </div>
    </section>
  );
};

export default HeroSection;
