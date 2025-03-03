import { ButtonCancelar } from "@/components/ButtonCancelar";
import { updateOrderStatus } from "@/services/orderService";
import orderDataStorage from "@/storage/orderStore";

interface OrderPaymentUserProps {
  orderId: string;
  price: string; // Agregamos el precio como prop
  onClose: () => void;
}

export const OrderPaymentUser = ({ orderId, price, onClose }: OrderPaymentUserProps) => {
  const montoMostrar = price ? price : "0"; // Mostramos el precio si está disponible

  const handleConfirmar = async (orderId: string) => {
    try {
      const response = await updateOrderStatus(orderId, "CONFIRMADO");
      if (response) {
        // Actualizamos solo el status, manteniendo los demás valores
        const order = orderDataStorage.getState().orderData.find(order => order.id === orderId);
        if (order) {
          orderDataStorage.getState().updateOrder({
            ...order, // Mantenemos el resto de los valores
            status: "CONFIRMADO", // Solo actualizamos el status
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-900">Monto a Pagar</h3>
      <p className="text-xl font-bold text-blue-600">${montoMostrar}</p>

      <div className="flex gap-4 mt-4">
        <button
          className={`w-full px-4 py-2 my-4 text-white font-semibold rounded-lg ${parseFloat(montoMostrar) > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}

          disabled={parseFloat(montoMostrar) <= 0}
          onClick={() => handleConfirmar(orderId)} // Llamada a handleConfirmar
        >
          Confirmar
        </button>
        <ButtonCancelar
          orderId={orderId}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
