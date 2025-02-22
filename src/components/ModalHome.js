import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="p-6 bg-transparent rounded-lg w-96 mx-[5vw] space-y-4">
        {children}
        <button
          className="w-full py-2 mt-4 text-bodyBold text-white bg-primary-500 rounded-[48px]"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
