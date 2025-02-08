import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    order?: {
        date: string;
        id: string;
        imei: string;
        status: string;
    };
}

export default function ModalOrden({ isOpen, onClose, order }: ModalProps) {
    if (!isOpen || !order) return null; // No renderiza nada si no está abierto

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Contenedor del modal */}
            <div className="relative flex flex-col w-[375px] p-4 rounded-xl border border-primary-900 bg-white shadow-lg">
                
                {/* Botón de cierre en la esquina superior derecha */}
                <button 
                    onClick={onClose} 
                    className="absolute top-[16px] right-[16px] text-black hover:text-gray-700"
                >
                    <X size={17} />
                </button>

                {/* Título */}
                <h3 className="text-primary-500 display3">
                    Detalle de orden
                </h3>

                {/* Opciones de selección */}
                <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-1">
                        <input type="radio" name="device" className="accent-black" />
                        Celular
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="radio" name="device" className="accent-black" />
                        Tablet
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="radio" name="device" className="accent-black" />
                        Laptop
                    </label>
                </div>

                {/* Datos de la orden */}
                <div className="flex flex-col px-4 items-start gap-4 w-full mt-4">
                    <p className="font-bold">Estado <span className="text-red-600">{order.status}</span></p>
                    <p className="font-bold">IMEI <span className="text-black">{order.imei}</span></p>
                    <p className="font-bold">ID Orden <span className="text-black">{order.id}</span></p>
                </div>

                {/* Campo de Descripción */}
                <textarea 
                    placeholder="Descripción aquí" 
                    className="w-full border-2 border-primary-900 rounded-lg p-2 mt-4 text-black"
                ></textarea>

                {/* Botones */}
                <div className="mt-4 flex flex-col gap-2 w-full">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Iniciar
                    </button>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Finalizar
                    </button>
                </div>

            </div>
        </div>
    );
}
