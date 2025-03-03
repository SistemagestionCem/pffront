import { X, UploadCloud } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DisplayOrder } from "../types";
import { toast } from "sonner";
import { postEvidenceService } from "@/services/evidenceService";

interface ModalEvidenceProps {
  isOpen: boolean;
  onClose: () => void;
  order: DisplayOrder | null;
  onUpdateOrder: () => Promise<void>
}
export default function ModalEvidence({
  isOpen,
  onClose,
  order,
  onUpdateOrder,
}: ModalEvidenceProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  useEffect(() => {
    if (!isOpen) {
      setFiles([]); // Resetea la lista de archivos cuando el modal se cierra
    }
  }, [isOpen]);

  const handleUpload = async () => {
    if (!order || files.length === 0) return;
  
    setIsUploading(true);
    setUploadProgress(0);
  
    try {
      const uploadedEvidences = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const response = await postEvidenceService(order.id, file);
        if (!response || !response.fileUrl) {
          throw new Error("No se recibió una URL válida");
        }
        uploadedEvidences.push(response);
  
        setTimeout(() => {
          setUploadProgress(((i + 1) / files.length) * 100);
        }, 200);
      }
  
      toast.success("Imagen subida correctamente!", {
        position: "top-center",
        richColors: true,
      });
  
      order.evidences = order.evidences
        ? [...order.evidences, ...uploadedEvidences]
        : uploadedEvidences;
  
      setFiles([]); // Limpiar archivos después de la subida
      setShowConfirmation(true);
  
      await onUpdateOrder();
    } catch (error) {
      console.log("Error de modal evidence", error);
      toast.error("Error al subir la imagen", {
        position: "top-center",
        richColors: true,
      });
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0); 
      }, 500);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
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

            {isUploading && (
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="h-full bg-blue-500 transition-all duration-300"
                ></div>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Subir Evidencia
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
            {showConfirmation ? (
              <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-semibold text-gray-900">
                  ¿Desea subir otra imagen?
                </p>
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    onClick={() => {
                      setShowConfirmation(false); // Volver al formulario para subir otra imagen
                    }}
                  >
                    Sí
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => {
                      setShowConfirmation(false);
                      onClose();
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="cursor-pointer flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg p-4 text-gray-600 hover:bg-gray-100 transition">
                    <UploadCloud size={32} className="mb-2" />
                    <span className="text-sm">Seleccionar archivos</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <div className="mb-4 max-h-32 overflow-y-auto">
                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <p key={index} className="text-sm text-gray-700 truncate">
                        {file.name}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No hay archivos seleccionados.
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                    disabled={files.length === 0 || isUploading}
                    onClick={handleUpload}
                  >
                    {isUploading ? "Subiendo..." : "Subir"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
