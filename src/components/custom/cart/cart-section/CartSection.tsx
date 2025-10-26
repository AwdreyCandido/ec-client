import { FiShoppingCart } from "react-icons/fi";
import { addItemToCart, removeCartItem } from "@/src/services/cart";
import CartItem from "../cart-item/CartItem";
import CartSummary from "../cart-summary/CartSummary";

type CartSectionProps = {
  cart: any;
  subtotal: number;
  refetchCart: () => void;
  handleCreateOrder: () => void;
};

const CartSection: React.FC<CartSectionProps> = ({
  cart,
  subtotal,
  refetchCart,
  handleCreateOrder,
}) => {
  const handleRemoveItem = async (itemId: number) => {
    const response = await removeCartItem(itemId);
    if (!response.message) refetchCart();
  };

  const handleUpdateQuantity = async (itemId: number, op: "add" | "remove") => {
    const item = cart.items.find((i: any) => i.id === itemId);
    if (!item) return;
    const newQuantity = op === "remove" ? item.quantity - 1 : item.quantity + 1;
    if (newQuantity <= 0) return await handleRemoveItem(item.id);

    const response = await addItemToCart({
      cartId: cart.id,
      productId: item.product.id,
      quantity: newQuantity,
    });

    if (!response.message) refetchCart();
  };

  return (
    <div className="w-[80vw] max-w-[80vw] grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FiShoppingCart className="text-secondary" /> Meu Carrinho
        </h2>

        {cart.items.length > 0 ? (
          <div className="space-y-8">
            {cart.items.map((item: any) => (
              <CartItem
                key={item.id}
                item={item}
                handleRemoveItem={handleRemoveItem}
                handleUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FiShoppingCart size={48} className="mx-auto mb-4" />
            <p>Seu carrinho está vazio 😢</p>
          </div>
        )}
      </div>

      <CartSummary subtotal={subtotal} handleCreateOrder={handleCreateOrder} />
    </div>
  );
};

export default CartSection;
