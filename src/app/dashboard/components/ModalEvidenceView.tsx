/* eslint-disable @next/next/no-img-element */
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DisplayOrder } from "../types";

interface ViewEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: DisplayOrder | null;
}

export default function ViewEvidenceModal({ isOpen, onClose, order }: ViewEvidenceModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

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
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Evidencias</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {order?.evidences && order.evidences.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                {order.evidences.map((evidence, index) => (
                  <img
                    key={index}
                    src={evidence.fileUrl}
                    alt={`Evidencia ${index + 1}`}
                    className="w-full h-24 object-contain rounded-lg border cursor-pointer bg-gray-100"
                    onClick={() => handleImageClick(evidence.fileUrl)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay evidencias disponibles.</p>
            )}

            {/* Imagen seleccionada */}
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"

                onClick={handleCloseImage}
              >

                <div className="relative bg-white p-2 rounded-lg">
                  {/* Botón de cierre (X) */}
                  <button
                    onClick={handleCloseImage}
                    className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition"
                  >
                    <X size={20} />
                  </button>
                  <motion.img
                    src={selectedImage}
                    alt="Evidencia Ampliada"
                    className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
