import { Link } from "lucide-react";
import React from "react";
import PageTransition from "@/components/PageTransition";

function Page() {
  const sections = [
    {
      title: "1. Aceptación de los Términos",
      content:
        "Al suscribirse a los servicios de TechFix, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos, por favor, no utilice nuestros servicios.",
    },
    {
      title: "2. Descripción del Servicio",
      content:
        "TechFix es una plataforma que proporciona servicios de reparación de dispositivos electrónicos. Nuestros servicios incluyen:",
      list: [
        "Reparación de pantallas y componentes",
        "Servicio de diagnóstico gratuito",
        "Garantía en todas nuestras reparaciones",
        "Servicio técnico certificado",
      ],
    },
    {
      title: "3. Garantía y Servicios",
      content:
        "Ofrecemos una garantía de 6 meses en todas nuestras reparaciones. Los términos específicos de la garantía se detallan al momento de la reparación.",
    },
    {
      title: "4. Uso del Servicio",
      content:
        "Nos comprometemos a utilizar repuestos de alta calidad y brindar un servicio profesional. No nos hacemos responsables por daños preexistentes no relacionados con nuestra reparación.",
    },
    {
      title: "5. Privacidad",
      content:
        "Protegemos su información personal según nuestra Política de Privacidad. No compartiremos su información con terceros sin su consentimiento, salvo cuando sea requerido por ley.",
    },
  ];

  return (
    <PageTransition>
      <div className="container mx-auto flex flex-col items-center px-[5vw] my-[120px] gap-[24px]">
        <div className="w-full max-w-[800px]">
          <h1 className="text-4xl font-bold text-center text-white text-display3 sm:text-4xl md:text-5xl lg:mb-8">
            Términos y Condiciones
          </h1>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 mb-8 text-white transition-all duration-300 rounded-lg bg-primary hover:bg-opacity-80"
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
                className="p-6 transition-colors duration-300 bg-white border border-white rounded-lg bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20"
              >
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                <p className="text-white">{section.content}</p>
                {section.list && (
                  <ul className="mt-4 text-white list-disc list-inside">
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
