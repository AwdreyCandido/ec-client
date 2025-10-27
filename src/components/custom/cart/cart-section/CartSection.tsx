import { FiShoppingCart } from "react-icons/fi";
import { addItemToCart, removeCartItem } from "@/src/services/cart";
import { notifyError } from "../../notifications/Notifications";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartItem from "../cart-item/CartItem";
import CartSummary from "../cart-summary/CartSummary";
import PaymentForm from "@/src/ext/payment-form/PaymentForm";

type CartSectionProps = {
  cart: any;
  subtotal: number;
  refetchCart: () => void;
  handleCreateOrder: () => void;
  handleCreateCheckout: () => void;
  onCloseModal: () => void;
  showPaymentForm: boolean;
  clientSecret: string | null;
};

const stripePromise = loadStripe(
  "pk_test_51SMQyhEXhD4PFG4aMbqKhWmnwsKO1GkOS7gcXNb1o0uOjDRkmOTRuqlY75laECxZ1c0svVbC1AGlJ97HWzU171aV00qOaRms3A"
);

const CartSection: React.FC<CartSectionProps> = ({
  cart,
  subtotal,
  refetchCart,
  handleCreateOrder,
  handleCreateCheckout,
  onCloseModal,
  showPaymentForm,
  clientSecret,
}) => {
  const handleRemoveItem = async (itemId: number) => {
    try {
      const response = await removeCartItem(itemId);
      if (!response.message) {
        refetchCart();
      }
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
      notifyError("Erro ao remover item do carrinho");
    }
  };

  const handleUpdateQuantity = async (itemId: number, op: "add" | "remove") => {
    try {
      const item = cart.items.find((i: any) => i.id === itemId);
      if (!item) return;

      const newQuantity =
        op === "remove" ? item.quantity - 1 : item.quantity + 1;

      if (newQuantity <= 0) {
        return await handleRemoveItem(item.id);
      }

      const response = await addItemToCart({
        cartId: cart.id,
        productId: item.product.id,
        quantity: newQuantity,
      });

      if (!response.message) {
        refetchCart();
      }
    } catch (error) {
      console.error("Erro ao atualizar quantidade do item:", error);
      notifyError("Erro ao atualizar quantidade do item");
    }
  };

  return (
    <div className="w-[80vw] max-w-[80vw] grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FiShoppingCart className="text-secondary" /> Meu Carrinho
        </h2>

        {(cart?.items ?? []).length > 0 ? (
          <div className="space-y-8">
            {cart?.items.map((item: any) => (
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

      <CartSummary
        subtotal={subtotal}
        handleCreateCheckout={handleCreateCheckout}
      />
      {showPaymentForm && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm onSuccess={handleCreateOrder} onClose={onCloseModal} />
        </Elements>
      )}
    </div>
  );
};

export default CartSection;
