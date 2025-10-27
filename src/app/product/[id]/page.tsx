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
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <section className="w-[80vw] max-w-[80vw] py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-[5rem]">
          <div className="relative overflow-hidden w-[60rem] h-[38rem] bg-white rounded-2xl shadow-md flex justify-center items-center">
            <Image
              src={product?.imageUrl!}
              alt={product?.name!}
              fill
              className="object-contain scale-[1.05]"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900">
              {product?.name}
            </h2>
            <p className="text-gray-600 text-lg">{product?.description}</p>
            <p className="text-blue-700 text-3xl font-bold">
              R$ {Number(product?.price).toFixed(2)}
            </p>
            <p className="text-gray-500 text-base">
              Estoque disponível: {product?.stock}
            </p>
            <PrimaryButton
              title=" Adicionar ao carrinho"
              onClick={() => {
                if (!user) return alert("Faça login primeiro!");
                handleAddCartItem(user.cart.id, product!.id);
              }}
            />
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Avaliações</h3>
          <div className="space-y-6">
            {product?.reviews?.map((review: ReviewType) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
