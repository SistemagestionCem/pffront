/* eslint-disable */
"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentForm } from "@/app/dashboard/components/PaymentFormAdmin";
import { OrderPaymentUser } from "@/app/dashboard/components/OrderPaymentUser";
import userDataStorage from "@/storage/userStore";
import { updateOrderStatus } from "@/services/orderService";
import orderDataStorage from "@/storage/orderStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: {
    id: string;
    clientEmail: string;
    clientDni: number;
    equipmentType: string;
    imei: string;
    assignedTechnician?: string;
    description: string;
    status: string;
    payment: null | {
      externalOrderId: string | null;
      id: string;
      invoicePaidAt: string | null;
      price: string;
      status: string;
    };
  };
  handleEstadoChange: (id: string, nuevoEstado: EstadoOrden) => void;
}

type EstadoOrden = "PENDIENTE" | "REVISION" | "CONFIRMADO" | "CANCELADO" | "REPARACION" | "FINALIZADO";

const estadoColores: Record<EstadoOrden, string> = {
  PENDIENTE: "text-black",
  REVISION: "text-blue-500",
  CONFIRMADO: "text-orange-500",
  CANCELADO: "text-red-600",
  REPARACION: "text-yellow-500",
  FINALIZADO: "text-green-500"
};

export default function ModalOrden({
  isOpen,
  onClose,
  order,
  handleEstadoChange,
}: ModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { userData } = userDataStorage();
  const isAdmin = userData?.role === "ADMIN";
  const isUser = userData?.role === "CLIENT";
  const isTechn = userData?.role === "TECHN";
  const [descripcion, setDescripcion] = useState("");

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

  const handlePayment = async (price: string, orderId: string) => {
    const monto = Number(price);
    if (monto <= 0) return;
    setIsProcessing(true);

    const order = {
      clientId: "1",
      title: orderId,
      description: "description",
      quantity: 1,
      unit_price: Number(monto),
      productId: orderId,
      external: "false",
    };

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (data.init_point) {
        window.open(data.init_point, "_blank"); // Redirige a MercadoPago en pestaña nueva
      }
    } catch (error) {
      console.error("Error en el pago:", error);
    } finally {
      setIsProcessing(false); // Desactiva el spinner al finalizar
    }
  };

  const handleRepair = async (orderId: string) => {
    try {
      const response = await updateOrderStatus(orderId, "REPARACION");
      if (response) {
        // Actualizamos solo el status, manteniendo los demás valores
        const order = orderDataStorage.getState().orderData.find(order => order.id === orderId);
        if (order) {
          orderDataStorage.getState().updateOrder({
            ...order, // Mantenemos el resto de los valores
            status: "REPARACION", // Solo actualizamos el status
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
    <AnimatePresence>
      {isOpen && order && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[480px] max-h-[90vh] overflow-y-auto mx-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Detalle de orden
              </h2>
              <button
                type="button"
                title="Cerrar"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 mb-6">
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Estado:
                </label>
                <p
                  className={`mt-1 font-medium text-gray-700`}
                >
                  {order.status}
                </p>
              </div>
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Dispositivo:
                </label>
                <p className="mt-1 text-gray-900">{order.equipmentType}</p>
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
                  Email Cliente:
                </label>
                <p className="mt-1 text-gray-900 truncate" title={order.id}>
                  {order.clientEmail}
                </p>
              </div>
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Dni Cliente:
                </label>
                <p className="mt-1 text-gray-900 truncate" title={order.id}>
                  {order.clientDni}
                </p>
              </div>

              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Descripción:
                </label>
                <textarea
                  placeholder="Ingrese una descripción detallada aquí..."
                  className="mt-1 w-full text-black p-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[120px] resize-none"
                  value={order.description}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>

            {(isAdmin && order.status === "REVISION") && (
              <div className="space-y-2 mb-4">
                <PaymentForm orderId={order.id} />
              </div>
            )}

            {isUser && order.status === "REVISION" && order.payment !== null && (
              <div className="space-y-2 mb-4">
                <OrderPaymentUser orderId={order?.id} price={order?.payment?.price} onClose={onClose} />
              </div>
            )}

            {(isUser && order.status === "REPARACION" && order.payment?.status === "PENDING") && (
              <div className="space-y-3">
                <button
                  onClick={() => handlePayment(order.payment?.price ?? '0', order.id)}
                  className={`w-full px-4 py-2 text-bodyBold text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 bg-primary-500 hover:bg-primary-600 ${isProcessing ? "cursor-not-allowed" : ""}`}
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="white"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="white"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    "Pagar"
                  )}
                </button>
              </div>
            )}

            {isTechn && order.status === "PENDIENTE" && (
              <button
                onClick={() => handleEstadoChange(order.id, "REVISION")}
                className="w-full px-4 py-2 text-bodyBold text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 bg-blue-500 hover:bg-blue-600"
              >
                Revisión
              </button>
            )}

            {isTechn && order.status === "CONFIRMADO" && (
              <button
                onClick={() => handleEstadoChange(order.id, "REPARACION")}
                className="w-full px-4 py-2 text-bodyBold text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 bg-orange-500 hover:bg-orange-600"
              >
                Reparación
              </button>
            )}

            {isTechn && order.status === "REPARACION" && (
              <button
                onClick={() => handleEstadoChange(order.id, "FINALIZADO")}
                className="w-full px-4 py-2 text-bodyBold text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 bg-green-500 hover:bg-green-600"
              >
                Finalizar
              </button>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
