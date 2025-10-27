"use client";
import Image from "next/image";
import { useStoresProvider } from "@/src/contexts/StoresContext";
import { useAuthProvider } from "@/src/contexts/AuthContext";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Product } from "@/src/data/types/product";
import { addItemToCart } from "@/src/services/cart";
import { ReviewType } from "@/src/data/types/review";
import Review from "@/src/components/custom/main/review/Review";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";
import { API_PATH } from "@/src/utils/constants";
import PageLoading from "@/src/components/custom/loading/PageLoading";
import {
  notifySuccess,
  notifyError,
} from "@/src/components/custom/notifications/Notifications";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthProvider();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () =>
      fetch(`${API_PATH}/products/${id}`).then((res) => res.json()),
  });

  const handleAddCartItem = async (storeId: number, productId: number) => {
    if (!user) {
      alert("Faça login primeiro!");
      return;
    }
    try {
      const response = await addItemToCart({
        cartId: user.cart.id,
        productId,
      });

      queryClient.invalidateQueries(["cart", user.cart.id] as any);
      notifySuccess("Produto adicionado ao carrinho");
      console.log("add item", response);
    } catch (err) {
      console.error(err);
      notifyError("Erro ao adicionar produto ao carrinho");
    }
  };

  if (isLoading) return <PageLoading />;
  if (error)
    return <p className="text-red-500 text-center mt-4">{error.message}</p>;

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 px-4 pt-[8rem] md:pt-0 sm:px-6 md:px-8 lg:px-16">
      <section className="w-full max-w-[1200px] py-20 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-12">
          <div className="relative w-full h-80 sm:h-96 md:h-[38rem] rounded-2xl shadow-md flex justify-center items-center overflow-hidden">
            <Image
              src={product?.imageUrl!}
              alt={product?.name!}
              fill
              className="object-contain scale-[1.05]"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 md:space-y-6 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
              {product?.name}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              {product?.description}
            </p>
            <p className="text-blue-700 text-2xl sm:text-3xl font-bold">
              R$ {Number(product?.price).toFixed(2)}
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              Estoque disponível: {product?.stock}
            </p>
            <div className="flex justify-center md:justify-start">
              <PrimaryButton
                title="Adicionar ao carrinho"
                onClick={() => {
                  if (!user) return alert("Faça login primeiro!");
                  handleAddCartItem(user.cart.id, product!.id);
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center md:text-left">
            Avaliações
          </h3>
          <div className="space-y-4 md:space-y-6">
            {product?.reviews?.map((review: ReviewType) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
