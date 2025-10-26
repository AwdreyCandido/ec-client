import { FiPackage } from "react-icons/fi";
import OrderGroup from "../order-group/OrderGroup";
import { OrderGroupType } from "@/src/data/types/order-group";

type OrdersSectionProps = {
  orders: OrderGroupType[];
};

const OrdersSection: React.FC<OrdersSectionProps> = ({ orders }) => (
  <div className="w-[80vw] max-w-[80vw] bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <FiPackage className="text-secondary" /> Meus Pedidos
    </h2>

    {orders.length > 0 ? (
      <div className="space-y-10">
        {orders.map((group) => (
          <OrderGroup key={group.id} group={group} />
        ))}
      </div>
    ) : (
      <div className="text-center py-16 text-gray-500">
        <FiPackage size={48} className="mx-auto mb-4" />
        <p>Você ainda não possui pedidos.</p>
      </div>
    )}
  </div>
);

export default OrdersSection;
