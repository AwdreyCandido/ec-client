import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

type CartItemProps = {
  item: any;
  handleRemoveItem: (itemId: number) => void;
  handleUpdateQuantity: (itemId: number, op: "add" | "remove") => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleRemoveItem,
  handleUpdateQuantity,
}) => (
  <div className="flex items-center justify-between not-last:border-b border-gray-200 pb-6">
    <div className="flex items-center gap-6">
      <div className="relative w-[7.3rem] h-[7.3rem] rounded-xl overflow-hidden bg-gray-300">
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          {item.product.name}
        </h3>
        <p className="text-gray-500 text-base line-clamp-1 max-w-[20rem]">
          {item.product.description}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={() => handleUpdateQuantity(item.id, "remove")}
            className="bg-gray-200 hover:bg-gray-100 p-2 rounded-lg"
          >
            <FiMinus />
          </button>
          <span className="text-gray-800 font-medium text-lg">
            {item.quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(item.id, "add")}
            className="bg-gray-200 hover:bg-gray-100 p-2 rounded-lg"
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>

    <div className="text-left w-[16rem]">
      <p className="text-large font-semibold text-blue-700">
        R$ {parseFloat(item.totalPrice).toFixed(2)}
      </p>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="mt-3 text-red-500 hover:text-red-700 flex items-center gap-1 justify-end"
      >
        <FiTrash2 /> Remover
      </button>
    </div>
  </div>
);

export default CartItem;
