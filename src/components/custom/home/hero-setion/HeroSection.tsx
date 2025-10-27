"use client";
import Image from "next/image";
import placeholder from "@/public/assets/images/placeholder.png";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";
import HeroGrid from "../hero-grid/HeroGrid";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row h-auto md:h-screen w-full px-8 md:pt-0 sm:px-8 md:px-20 py-20 md:py-36 lg:py-52 bg-linear-to-br from-secondary-light from-40% to-secondary rounded-tl-[5rem] md:rounded-tl-[15rem] rounded-br-[5rem] md:rounded-br-[15rem] shadow-sm">
      <div className="w-full md:w-[80vw] max-w-full md:max-w-[80vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[10rem] items-center">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="text-6xl md:text-7xl lg:text-[5rem] font-sora font-semibold text-gray-900 mb-6 leading-snug md:leading-tight">
            <p>Encontre tudo</p>
            <p>o que você precisa</p>
            <p className="font-figtree">em um só Lugar!</p>
          </h2>
          <p className="text-gray-700 text-button max-w-full md:max-w-2xl mb-8 md:mb-20">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
            cumque, rem accusamus natus.
          </p>
          <div className="flex justify-center md:justify-start">
            <PrimaryButton title="Explorar lojas" />
          </div>
        </div>
        <HeroGrid />
      </div>
    </section>
  );
};

export default HeroSection;
