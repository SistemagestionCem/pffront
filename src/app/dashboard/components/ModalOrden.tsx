"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentForm } from "@/app/dashboard/components/PaymentFormAdmin";
import { useMontoStore } from "@/storage/montoStore";
import { OrderPaymentUser } from "@/app/dashboard/components/OrderPaymentUser";
import userDataStorage from "@/storage/userStore";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: {
    date: string;
    id: string;
    device: string;
    status: EstadoOrden;
  };
  handleEstadoChange: (id: string, nuevoEstado: EstadoOrden) => void;
}

type EstadoOrden = "Actualizar" | "Pendiente" | "Iniciado" | "Finalizado";

const estadoColores: Record<EstadoOrden, string> = {
  Actualizar: "text-black",
  Iniciado: "text-blue-500",
  Pendiente: "text-orange-500",
  Finalizado: "text-red-600",
};



export default function ModalOrden({
  isOpen,
  onClose,
  order,
  handleEstadoChange,
}: ModalProps) {
  const { userData } = userDataStorage();
  const isAdmin = userData?.role === "ADMIN";
  const isUser = userData?.role === "CLIENT"
  const [descripcion, setDescripcion] = useState("");
  const { monto } = useMontoStore();
  const canAdminPay = isAdmin && monto > 0;

  useEffect(() => {
    setDescripcion("");
  }, [order]);

  if (!isOpen || !order) return null;




  const minCaracteres = 3;
  const isDisabled = descripcion.length < minCaracteres;
  const isFinalizado = order.status === "Finalizado";

  const handleChangeEstado = (nuevoEstado: EstadoOrden) => {
    if (!isFinalizado && !isDisabled && order) {
      handleEstadoChange(order.id, nuevoEstado);
      onClose();
    }
  };

  const handlePayment = async () => {
    const order = {
      clientId: "1",
      title: "title",
      description: "description",
      quantity: 1,
      unit_price: monto,
      productId: "1",
      external: "false",
    };

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await response.json();
      console.log(data);

      if (data.init_point) {
        window.location.href = data.init_point; // Redirige a MercadoPago
      }
    } catch (error) {
      console.error("Error en el pago:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && order && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Detalle de orden
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Estado:
                </label>
                <p
                  className={`mt-1 font-medium ${estadoColores[order.status]}`}
                >
                  {order.status}
                </p>
              </div>
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Dispositivo:
                </label>
                <p className="mt-1 text-gray-900">{order.device}</p>
              </div>
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  ID Orden:
                </label>
                <p className="mt-1 text-gray-900 truncate" title={order.id}>
                  {order.id}
                </p>
              </div>

              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Descripción:
                </label>
                <textarea
                  placeholder="Ingrese una descripción detallada aquí..."
                  className="mt-1 w-full text-black p-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[120px] resize-none"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>

            {isAdmin && (
              <div className="space-y-4 mb-4">
                <PaymentForm orderId={order.id} />
              </div>
            )}

            {isUser && (
              <div className="space-y-4 mb-4">
                <OrderPaymentUser orderId={order.id} />
              </div>
            )}


            <div className="space-y-3">
              <button
                onClick={handlePayment}
                className={`w-full px-4 py-2 text-bodyBold rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                  canAdminPay
                  ? "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400"
                  : "text-gray-500 bg-gray-200 opacity-50 cursor-not-allowed focus:ring-gray-300"
              }`}
              disabled={!canAdminPay}  
              >
                Pagar
              </button>
              <button
                className={`w-full px-4 py-2 text-bodyBold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDisabled || isFinalizado
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                  }`}
                disabled={isDisabled || isFinalizado}
                onClick={() => handleChangeEstado("Iniciado")}
              >
                Iniciar
              </button>
              <button
                className={`w-full px-4 py-2 text-bodyBold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${isDisabled || isFinalizado
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                  }`}
                disabled={isDisabled || isFinalizado}
                onClick={() => handleChangeEstado("Finalizado")}
              >
                Finalizar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
