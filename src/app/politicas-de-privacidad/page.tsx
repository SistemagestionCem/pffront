import { Link } from "lucide-react";
import React from "react";
import PageTransition from "@/components/PageTransition";

function Page() {
  const sections = [
    {
      title: "1. Información que Recopilamos",
      content:
        "En TechFix, recopilamos la siguiente información cuando utiliza nuestros servicios:",
      list: [
        "Datos de contacto (nombre, teléfono, correo electrónico)",
        "Información del dispositivo a reparar",
        "Historial de servicios y reparaciones",
        "Información de pago",
      ],
    },
    {
      title: "2. Uso de la Información",
      content: "Utilizamos su información personal para:",
      list: [
        "Proporcionar servicios de reparación",
        "Comunicarnos sobre el estado de su reparación",
        "Enviar presupuestos y facturas",
        "Mejorar nuestros servicios",
      ],
    },
    {
      title: "3. Protección de Datos",
      content:
        "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o alteración.",
    },
    {
      title: "4. Compartir Información",
      content:
        "No compartimos su información personal con terceros, excepto cuando sea necesario para completar su servicio de reparación o cuando sea requerido por ley.",
    },
    {
      title: "5. Sus Derechos",
      content:
        "Usted tiene derecho a acceder, corregir o solicitar la eliminación de su información personal. Puede ejercer estos derechos contactándonos directamente.",
    },
  ];

  return (
    <PageTransition>
      <div className="container mx-auto flex flex-col items-center px-[5vw] my-[120px] gap-[24px]">
        <div className="w-full max-w-[800px]">
          <h1 className="text-4xl font-bold text-center text-white text-display3 sm:text-4xl md:text-5xl">
            Política de Privacidad
          </h1>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 mb-8 text-white rounded-lg transition-all duration-300 bg-primary hover:bg-opacity-80"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver al inicio
          </Link>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="p-6 border border-white rounded-lg bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-colors duration-300"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-white">{section.content}</p>
                {section.list && (
                  <ul className="list-disc list-inside mt-4 text-white">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Page;
