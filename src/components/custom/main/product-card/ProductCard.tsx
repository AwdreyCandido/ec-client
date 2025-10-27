"use client";
import { Product } from "@/src/data/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { TbShoppingBagPlus } from "react-icons/tb";

type ProductCardProps = {
  product: Product;
  storeName: string;
  onAddToCart: (productId: number) => Promise<void> | void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  storeName,
  onAddToCart,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group overflow-hidden transition-all duration-300 select-none">
      <Link href={`/product/${product.id}`}>
        <div className="relative rounded-2xl w-full h-56 flex items-center justify-center bg-gray-50 overflow-hidden cursor-pointer">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={240}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            {storeName}
          </span>
        </div>
      </Link>

      <div className="py-5 flex flex-col">
        <h4 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600">
          {product.name}
        </h4>
        <p className="text-gray-500 text-base line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-blue-700 font-bold text-xl">
            R$ {Number(product.price).toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`w-[3.5rem] h-[3.5rem] flex items-center justify-center border-secondary p-2 rounded-full shadow-md transition duration-300 ${
              isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary-light text-secondary hover:text-white hover:bg-secondary"
            }`}
            title="Adicionar ao carrinho"
          >
            {isLoading ? (
              <ImSpinner2 className="animate-spin" size={20} />
            ) : (
              <TbShoppingBagPlus className="stroke-2" size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
