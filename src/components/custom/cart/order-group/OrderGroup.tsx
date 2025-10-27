import { OrderGroupType } from "@/src/data/types/order-group";
import Image from "next/image";

type OrderGroupProps = {
  group: OrderGroupType;
};

const OrderGroup: React.FC<OrderGroupProps> = ({ group }) => (
  <fieldset className="border rounded-2xl p-6">
    <legend className="text-gray bg-secondary-light px-2 rounded-sm mb-2">
      Pedido #{group.id} -{" "}
      {new Date(group.createdAt).toLocaleDateString("pt-BR")}
    </legend>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {group.orders.map((order: any) => (
        <div
          key={order.id}
          className="flex items-center gap-4 border rounded-xl p-3"
        >
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={order.product.imageUrl}
              alt={order.product.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{order.product.name}</p>
            <p className="text-base text-gray-500">
              {order.product.description}
            </p>
            <p className="text-secondary font-medium">
              R$ {parseFloat(order.totalAmount).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </fieldset>
);

export default OrderGroup;
