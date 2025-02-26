import { createPayment } from "@/services/paymentService";
import orderDataStorage from "@/storage/orderStore";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentFormProps {
  orderId: string;
  onClose: () => void;
}

export const PaymentForm = ({ orderId, onClose }: PaymentFormProps) => {
  const [monto, setMonto] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonto(e.target.value.replace(/\D/, "")); // Solo números
  };

  const handleGenerarPago = async () => {
    const price = Number(monto);
    if (price <= 0) {
      toast.error("El monto debe ser mayor a 0");
      return;
    }

    try {
      const response = await createPayment({ order_id: orderId, price });
      if (response) {
        toast.success(`"Orden de Pago generado con éxito"`, {
          position: "top-center",
          richColors: true,
        });
        setMonto(""); // Resetea el input
        // Actualizamos solo el status, manteniendo los demás valores
        const order = orderDataStorage.getState().orderData.find(order => order.id === orderId);
        if (order) {
          orderDataStorage.getState().updateOrder({
            ...order, // Mantenemos el resto de los valores
            payments: {
              id: response.id,
              externalOrderId: response.externalOrderId,
              invoicePaidAt: response.invoicePaidAt,
              price: response.price,
              status: response.status,
            }, // Solo actualizamos el status
          });
        }
        onClose();
      }
    } catch (error) {
      console.error("Error al generar el pago:", error);
      toast.error("Error al generar el pago");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div>
        <label className="text-bodyBold font-bold text-gray-700">
          Monto a pagar:
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={monto}
          onChange={handleChange}
          placeholder="Ingrese el monto"
          className="mt-1 w-full text-black p-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      <button
        onClick={handleGenerarPago}
        className={`w-full px-4 py-2 text-bodyBold text-white rounded-lg transition-colors duration-200 ${
          monto && Number(monto) > 0
            ? "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            : "bg-green-500 opacity-50 cursor-not-allowed"
        }`}
        disabled={!monto || Number(monto) <= 0}
      >
        Generar Pago
      </button>
    </div>
  );
};
