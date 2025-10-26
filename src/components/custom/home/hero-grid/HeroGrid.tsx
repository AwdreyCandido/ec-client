import Image from "next/image";
import placeholder from "@/public/assets/images/placeholder.png";

const HeroGrid = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-9 gap-8 w-full h-[40rem]">
      <div className="col-span-3 row-span-5 bg-red-500 rounded-2xl overflow-hidden">
        <Image
          src={placeholder}
          alt="Hero Image"
          width={500}
          height={400}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-start-4 col-span-2 row-span-6 bg-blue-500 rounded-2xl overflow-hidden">
        <Image
          src={placeholder}
          alt="Hero Image"
          width={500}
          height={400}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-3 row-start-6 row-span-4 bg-green-500 rounded-2xl overflow-hidden">
        <Image
          src={placeholder}
          alt="Hero Image"
          width={500}
          height={400}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-start-4 col-span-2 row-start-7 row-span-3 bg-yellow-500 rounded-2xl overflow-hidden">
        <Image
          src={placeholder}
          alt="Hero Image"
          width={500}
          height={400}
          priority
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroGrid;
