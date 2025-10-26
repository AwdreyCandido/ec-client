"use client";
import ProductCard from "../../main/product-card/ProductCard";
import StoreCard from "../store-card/StoreCard";
import { Store } from "@/src/data/types/store";

type StoreListProps = {
  stores: Store[];
  onAddToCart: (storeId: number, productId: number) => void;
};

const StoreList: React.FC<StoreListProps> = ({ stores, onAddToCart }) => {
  return (
    <section id="stores" className="w-full flex justify-center bg-background">
      <div className="w-[80vw] max-w-[80vw] px-8 md:px-20 py-24 space-y-28">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store}>
            {store.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {store.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    storeName={store.name}
                    onAddToCart={(productId) =>
                      onAddToCart(store.id, productId)
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Nenhum produto disponível.</p>
            )}
          </StoreCard>
        ))}
      </div>
    </section>
  );
};

export default StoreList;
