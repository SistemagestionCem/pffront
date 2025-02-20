import { useEffect } from "react";
import { useMontoStore } from "@/storage/montoStore";
import { toast } from "sonner";


export const PaymentForm = () => {
    const { monto, setMonto } = useMontoStore();

    useEffect(() => {
        setMonto(0); // Reinicia el monto cuando se abre una nueva orden
    }, [setMonto]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (/^\d*$/.test(value)) {
            setMonto(Number(value));
        }
    };

    const handleGenerarPago = () => {
        if (monto > 0) {
            toast.success(`Orden generada exitosamente por $${monto}`, {
                position: "top-center",
                richColors: true,
              });
        }
    };

    return (
        <div className="w-full space-y-4">
            <div>
                <label className="text-bodyBold font-bold text-gray-700">
                    Monto a pagar:
                </label>
                <input
                    type="number"
                    value={monto}
                    onChange={handleChange}
                    placeholder="Ingrese el monto"
                    min="0"
                    className="mt-1 w-full text-black p-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"

                />
            </div>

            <button
                onClick={handleGenerarPago}
                className={`w-full px-4 py-2 text-bodyBold text-white rounded-lg transition-colors duration-200 ${monto > 0
                        ? "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                        : "bg-green-500 opacity-50 cursor-not-allowed"
                    }`}
                disabled={monto <= 0}
            >
                Generar Pago
            </button>
        </div>
    );
};
