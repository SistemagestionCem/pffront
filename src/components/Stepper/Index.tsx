import { motion } from "framer-motion";

const steps = ["Pendiente", "Orden Generada", "En Reparación", "Finalizado"];

interface StepperProps {
  orderStatus: string; // Estado actual de la orden
  isGenerated: boolean; // Si fue creada por el admin
 // isPaid: boolean; // Si está pagada o esperando pago
}

export default function Stepper({ orderStatus, isGenerated }: StepperProps) {
 
  let currentStep = 0;

  if (isGenerated) currentStep = 1; // Si el admin la generó, avanza al paso 2
  if (orderStatus === "REPARACION") currentStep = 2; // Si está en reparación, paso 3
  if (orderStatus === "FINALIZADO") currentStep = 3; // Si está finalizado  paso 4

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center w-full max-w-lg relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-full">
      
            {index !== 0 && (
              <motion.div
                className="h-1 w-full bg-gray-300 relative"
                animate={{
                  backgroundColor: index <= currentStep ? "#3b82f6" : "#d1d5db",
                }}
              />
            )}

            <motion.div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-all duration-300
                ${
                  index <= currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              animate={{
                scale: index === currentStep ? 1.2 : 1,
              }}
            >
              {index + 1}
            </motion.div>

            <span
              className={`text-sm mt-2 ${
                index <= currentStep ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
