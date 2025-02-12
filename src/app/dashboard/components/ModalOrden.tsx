"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: {
    date: string;
    id: number;
    device: string;
    status: EstadoOrden;
  };
  handleEstadoChange: (id: number, nuevoEstado: EstadoOrden) => void;
}

type EstadoOrden = "Iniciado" | "Pendiente" | "Finalizado";

const estadoColores: Record<EstadoOrden, string> = {
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
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    setDescripcion(""); // Resetea la descripción cada vez que cambia la orden
  }, [order]);

  if (!isOpen || !order) return null; // No renderiza nada si no está abierto

  const minCaracteres = 3;
  const isDisabled = descripcion.length < minCaracteres;
  const isFinalizado = order.status === "Finalizado";

  const handleChangeEstado = (nuevoEstado: EstadoOrden) => {
    if (!isFinalizado && !isDisabled && order) {
      handleEstadoChange(order.id, nuevoEstado);
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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative flex flex-col w-full max-w-[500px] mx-4 rounded-[16px] border border-primary-900/20 bg-white shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-primary-500 transition-colors duration-200"
            >
              <X size={20} />
            </button>

            <div className="w-full p-6">
              <h3 className="text-primary-500 display3 mb-2">
                Detalle de orden
              </h3>
              <div className="border-b border-primary-900/20 w-full"></div>
            </div>

            <div className="flex flex-col px-6 gap-4 w-full text-secondary-900">
              <p className="flex justify-between items-center w-full">
                <span className="title3 text-gray-600">Estado:</span>
                <span
                  className={`subtitle1 font-semibold ${estadoColores[order.status]}`}
                >
                  {order.status}
                </span>
              </p>
              <p className="flex justify-between items-center w-full">
                <span className="title3 text-gray-600">Dispositivo:</span>
                <span className="subtitle1">{order.device}</span>
              </p>
              <p className="flex justify-between items-center w-full">
                <span className="title3 text-gray-600">ID Orden:</span>
                <span
                  className="subtitle1 max-w-[200px] truncate"
                  title={order.id.toString()}
                >
                  {order.id}
                </span>
              </p>
            </div>

            <div className="px-6 pt-4 w-full">
              <textarea
                placeholder="Ingrese una descripción detallada aquí..."
                className="w-full h-[120px] px-4 py-3 border border-gray-300 rounded-[8px] text-black resize-none body placeholder:text-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 text-base selection:bg-transparent outline-none"
                style={{
                  fontSize: "16px",
                  WebkitTapHighlightColor: "transparent",
                }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></textarea>
            </div>

            <div className="p-6 flex flex-col gap-3 w-full">
              <button
                className={`flex justify-center items-center w-full py-2.5 px-6 rounded-[8px] bg-blue-500 text-white text-subtitle1 font-semibold hover:bg-blue-600 transition-colors duration-200 ${
                  isDisabled || isFinalizado
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={isDisabled || isFinalizado}
                onClick={() => handleChangeEstado("Iniciado")}
              >
                <i className="fa-solid fa-play mr-2 fa-xs"></i>
                Iniciar
              </button>

              <button
                className={`flex justify-center items-center w-full py-2.5 px-6 rounded-[8px] bg-primary-500 text-white text-subtitle1 font-semibold hover:bg-primary-600 transition-colors duration-200 ${
                  isDisabled || isFinalizado
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={isDisabled || isFinalizado}
                onClick={() => handleChangeEstado("Finalizado")}
              >
                <i className="fa-solid fa-check mr-2 fa-xs"></i>
                Finalizar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
