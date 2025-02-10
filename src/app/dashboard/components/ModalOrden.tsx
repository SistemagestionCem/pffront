"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

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

type EstadoOrden = "Iniciado" | "En Proceso" | "Finalizado";

const estadoColores: Record<EstadoOrden, string> = {
    Iniciado: "text-blue-500",
    "En Proceso": "text-orange-500",
    Finalizado: "text-red-600",
};

export default function ModalOrden({ isOpen, onClose, order, handleEstadoChange }: ModalProps) {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

            <div className="relative flex flex-col w-[375px] p-4 rounded-xl border border-primary-900 bg-white shadow-lg">
         
                <button
                    onClick={onClose}
                    className="absolute top-[16px] right-[16px] text-black hover:text-gray-700"
                >
                    <X size={17} />
                </button>
                
                <div className="w-full px-4 pt-4">
                    <h3 className="text-primary-500 display3">Detalle de orden</h3>
                    <div className="border-b border-primary-900 w-[95%] ml-0 pt-2"></div>
                </div>


                <div className="flex flex-col px-4 pb-4 items-start gap-4 w-full mt-4 text-secondary-900">
                    <p className="flex justify-between w-[80%]">
                        <span className="title3">Estado:</span>
                        <span className={`subtitle2 text-right ${estadoColores[order.status]}`}>
                            {order.status}
                        </span>
                    </p>
                    <p className="flex justify-between w-[80%]">
                        <span className="title3">Dispositivo:</span>
                        <span className="subtitle2 text-right">{order.device}</span>
                    </p>
                    <p className="flex justify-between w-[80%]">
                        <span className="title3">ID Orden:</span>
                        <span className="subtitle2 text-right">{order.id}</span>
                    </p>
                </div>
                
                <textarea
                    placeholder="Descripción aquí"
                    className="w-full h-[96px] px-4 py-2 border-2 border-primary-900 rounded-lg text-black resize-none body"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>

                {/* Botones */}
                <div className="mt-4 flex flex-col gap-2 w-full">
                    <button
                        className={`flex justify-center items-center gap-2 w-full py-1.5 px-6 rounded-xl bg-blue-500 text-white text-lg bodyBold hover:bg-blue-600 transition ${
                            isDisabled || isFinalizado ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isDisabled || isFinalizado}
                        onClick={() => handleChangeEstado("En Proceso")}
                    >
                        Iniciar
                    </button>

                    <button
                        className={`flex justify-center items-center gap-2 w-full py-1.5 px-6 rounded-xl bg-red-600 text-white text-lg bodyBold hover:bg-red-700 transition ${
                            isDisabled || isFinalizado ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isDisabled || isFinalizado}
                        onClick={() => handleChangeEstado("Finalizado")}
                    >
                        Finalizar
                    </button>
                </div>
            </div>
        </div>
    );
}
