import { createPayment } from "@/services/paymentService";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentFormProps {
  orderId: string;
}

export const PaymentForm = ({ orderId }: PaymentFormProps) => {
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
      await createPayment({ order_id: orderId, price });
      toast.success(`"Orden de Pago generado con éxito"`, {
        position: "top-center",
        richColors: true,
      });
      setMonto(""); // Resetea el input
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
