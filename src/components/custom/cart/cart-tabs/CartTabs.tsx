import { FiShoppingCart, FiPackage } from "react-icons/fi";

type CartTabsProps = {
  activeTab: "cart" | "orders";
  setActiveTab: (tab: "cart" | "orders") => void;
};

const CartTabs: React.FC<CartTabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="w-[80vw] max-w-[80vw] flex items-end gap-6 border-b border-gray-200">
    <button
      onClick={() => setActiveTab("cart")}
      className={`pb-3 px-6 text-button font-semibold text-lg transition-all ${
        activeTab === "cart"
          ? "border-b-4 border-secondary text-secondary"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      <FiShoppingCart className="inline-block mr-2" /> Carrinho
    </button>

    <button
      onClick={() => setActiveTab("orders")}
      className={`pb-3 px-6 text-button font-semibold text-lg transition-all ${
        activeTab === "orders"
          ? "border-b-4 border-secondary text-secondary"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      <FiPackage className="inline-block mr-2" /> Pedidos
    </button>
  </div>
);

export default CartTabs;
