type CartSummaryProps = {
  subtotal: number;
  handleCreateOrder: () => void;
};

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  handleCreateOrder,
}) => (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 h-fit">
    <h3 className="font-semibold text-gray-900 mb-6">Resumo da compra</h3>
    <div className="space-y-4 text-base text-gray-700">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>R$ {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Frete</span>
        <span>R$ 0,00</span>
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="flex justify-between font-bold text-xl">
        <span>Total</span>
        <span>R$ {subtotal.toFixed(2)}</span>
      </div>
    </div>

    <button
      onClick={handleCreateOrder}
      className="w-full mt-8 bg-secondary text-white py-4 rounded-xl text-button font-semibold shadow hover:bg-blue-700 transition"
    >
      Finalizar compra
    </button>
  </div>
);

export default CartSummary;
