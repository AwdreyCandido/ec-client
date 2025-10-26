"use client";
import Image from "next/image";
import Link from "next/link";
import { Store } from "@/src/data/types/store";

type StoreCardProps = {
  store: Store;
  children?: React.ReactNode;
};

const StoreCard: React.FC<StoreCardProps> = ({ store, children }) => {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-6">
        <Link href={`/store/${store.id}`}>
          <div className="relative w-[10rem] h-[10rem] rounded-full overflow-hidden border-4 border-secondary shadow-md">
            <Image
              src={store.logoUrl}
              alt={store.name}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <div>
          <h3 className="text-subheading font-bold text-secondary">
            {store.name}
          </h3>
          <p className="text-gray-600">{store.description}</p>
          <p className="text-base text-gray-500 mt-1">
            ⭐ {store.ratings} / 5.0
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default StoreCard;
