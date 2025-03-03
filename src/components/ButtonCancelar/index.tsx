import { updateOrderStatus } from "@/services/orderService";
import orderDataStorage from "@/storage/orderStore";
import { useState } from "react";

interface ButtonCancelarProps {
    orderId: string;
    onClose: () => void;
}
export function ButtonCancelar({ orderId, onClose }: ButtonCancelarProps) {
    const [showConfirmationCancel, setShowConfirmationCancel] = useState(false);

    const handleCancelar = async () => {
        try {
            const response = await updateOrderStatus(orderId, "CANCELADO");
            if (response) {

                const order = orderDataStorage.getState().orderData.find(order => order.id === orderId);
                if (order) {
                    orderDataStorage.getState().updateOrder({
                        ...order,
                        status: "CANCELADO", // Solo actualizamos el status
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
        <>
            <button
                className="w-full my-4 px-4 py-2 text-white font-semibold bg-primary-500 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-primary-600"
                onClick={() => setShowConfirmationCancel(true)}
                >
                Cancelar
            </button>

            {showConfirmationCancel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
                        <p className="text-center text-lg font-semibold text-gray-900 mb-4">
                            ¿Está seguro de cancelar la orden? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                onClick={() => setShowConfirmationCancel(false)} // Cierra el modal sin cancelar
                            >
                                No
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                                onClick={() => {
                                    setShowConfirmationCancel(false);
                                    handleCancelar();
                                }}
                            >
                                Sí, Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </>

    )
}