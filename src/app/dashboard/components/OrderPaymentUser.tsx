import { useMontoStore } from "@/storage/montoStore";


interface OrderPaymentUserProps {
  orderId: string;
}

export const OrderPaymentUser = ({ orderId }: OrderPaymentUserProps) => {
  const { monto, orderId: storedOrderId } = useMontoStore();

  const montoMostrar = storedOrderId === orderId ? monto : 0;

 
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-900">Monto a Pagar</h3>
      <p className="text-xl font-bold text-blue-600">${montoMostrar}</p>

      <div className="flex gap-4 mt-4">
        <button
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
            montoMostrar > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          }`}

          disabled={montoMostrar <= 0}
        >
          Confirmar
        </button>
        <button
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
            montoMostrar > 0 ? "bg-primary-500 hover:bg-primary-600" : "bg-gray-400 transition-colors"
          }`}

          disabled={montoMostrar <= 0}
        >
          Cancelar
        </button> 
      </div>
    </div>
  );
};
