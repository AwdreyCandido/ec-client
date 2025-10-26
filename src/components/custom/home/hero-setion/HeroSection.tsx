"use client";
import Image from "next/image";
import placeholder from "@/public/assets/images/placeholder.png";

const HeroSection = () => {
  return (
    <section className="h-screen w-full flex justify-center px-8 md:px-20 py-36 bg-linear-to-br from-secondary-light from-40% to-secondary rounded-tl-[15rem] rounded-br-[15rem] pt-[15rem] shadow-sm">
      <div className="w-[80vw] max-w-[80vw] flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="w-[50rem] h-[40rem] ">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Encontre tudo o que você precisa em um só lugar!
            </h2>
            <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
              cumque, rem accusamus natus.
            </p>
            <button className="bg-secondary text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition transform font-semibold">
              Explorar lojas
            </button>
          </div>
        </div>
        <div className="flex-1 mt-12 md:mt-0 flex justify-center">
          <Image
            src={placeholder}
            alt="Hero Image"
            width={500}
            height={400}
            className="rounded-xl shadow-sm bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
