import { X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ModalCambioEstadoProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onChangeStatus: (newStatus: string) => Promise<void>;
}

const estadosDisponibles = ["Pendiente", "En Proceso", "Finalizado", "Cancelado"];

export default function ModalCambioEstado({
  isOpen,
  onClose,
  currentStatus,
  onChangeStatus,
}: ModalCambioEstadoProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async () => {
    if (!selectedStatus || selectedStatus === currentStatus) return;

    setIsLoading(true);
    try {
      await onChangeStatus(selectedStatus);
      toast.success("Estado actualizado correctamente", {
        position: "top-center",
        richColors: true,
      });
      onClose();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      toast.error("No se pudo actualizar el estado", {
        position: "top-center",
        richColors: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[400px] max-h-[90vh] overflow-y-auto mx-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Cambiar Estado
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

            {/* Dropdown de selección de estado */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Selecciona un nuevo estado:
              </label>
              <select
                className="w-full mt-2 p-2 border rounded-lg bg-white text-gray-900"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {estadosDisponibles.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                disabled={isLoading || selectedStatus === currentStatus}
                onClick={handleStatusChange}
              >
                {isLoading ? "Actualizando..." : "Confirmar"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
