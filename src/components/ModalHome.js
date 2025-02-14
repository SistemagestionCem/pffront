import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg w-96">
        {children}
        <button
          className="w-full py-2 mt-4 text-white bg-red-500 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
