/* eslint-disable @next/next/no-img-element */
"use client";
import ChatBotGemini from "@/components/Chatbot/ChatbotGemini";

import PageTransition from "@/components/PageTransition";
import { getOrderByEmail } from "@/services/orderService";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/ModalHome";
import { OrderByMail } from "@/interfaces";
import { X } from "lucide-react";

export default function Home() {
  const [userEmail, setUserEmail] = useState({
    email: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderByMail[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userEmail.email.trim()) {
      toast.error("Por favor ingrese un correo.", {
        position: "top-center",
        richColors: true,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail.email)) {
      toast.error("Por favor ingrese un correo válido.", {
        position: "top-center",
        richColors: true,
      });
      return;
    }

    try {
      const response = await getOrderByEmail(userEmail.email);

      if (!response) {
        toast.error("No se encontraron órdenes para este correo.", {
          position: "top-center",
          richColors: true,
        });
        return;
      }

      setOrderData(Array.isArray(response) ? response : [response]);
      setModalOpen(true);
    } catch (error) {
      console.error("Error al buscar la orden:", error);
      toast.error("Error al buscar la orden. Por favor intente nuevamente.", {
        position: "top-center",
        richColors: true,
      });
    }
  };

  const services = [
    {
      title: "Pantallas Rotas",
      description:
        "Servicio de reparación de pantallas dañadas para todo tipo de dispositivos, incluyendo celulares, tablets y laptops. Arreglamos grietas, píxeles muertos y problemas de visualización con repuestos de alta calidad.",
      img: "/servicio-repacion.png",
    },

    {
      title: "Baterías Defectuosas",
      description:
        "Reemplazo y reparación de baterías que se descargan rápido, no cargan o causan sobrecalentamiento. Usamos repuestos de calidad para maximizar la vida útil de tu dispositivo.",
      img: "/baterias-mobil.jpg",
    },
    {
      title: "Problemas de Software",
      description:
        "Solución de fallos en el sistema, reinicios inesperados, errores de actualización y optimización del rendimiento. Recuperamos datos y reinstalamos software para que tu equipo funcione como nuevo.",
      img: "/softwares.jpeg",
    },
  ];

  const chooseUs = [
    {
      title: "Técnicos Certificados",
    },
    {
      title: "Garantía de 6 Meses",
    },
    {
      title: "Repuestos Originales",
    },
    {
      title: "Servicio Rápido",
    },
  ];

  return (
    <PageTransition>
      <div className="container mx-auto flex flex-col items-center px-[5vw] pt-20 gap-4">
        {/* Hero Section */}
        <div className="w-full max-w-6xl">
          <img
            alt="reparacion de celulares"
            src="https://www.rollingstone.com/wp-content/uploads/2024/09/iphone-16-pro-featured-image.png?w=1581&h=1054&crop=1"
            className="w-full"
          />
        </div>

        {/* Search Section */}
        <section className="container flex flex-col items-center py-12 px-8  rounded-[16px] w-full max-w-6xl">
          <div className="max-w-4xl mb-8">
            <h1 className="text-center text-white text-display3 lg:display1">
              Recupera tu dispositivo con nuestro servicio rápido y garantizado!
            </h1>
          </div>
          <form
            className="w-full max-w-2xl text-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Ingresa tu correo"
              className="py-[10px] px-[16px] w-full text-center bg-white/90 rounded-[8px] placeholder-gray-500 outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 border border-transparent"
              value={userEmail.email}
              onChange={(e) =>
                setUserEmail({
                  ...userEmail,
                  email: e.target.value.toLowerCase(),
                })
              }
            />
            <button className="py-[10px] px-[16px]  bg-primary-500 mt-4 w-full rounded-[16px] text-white text-title2 hover:bg-primary-600 transition-colors">
              <i className="mr-2 fa-solid fa-xs fa-magnifying-glass"></i>Buscar
              orden
            </button>
          </form>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="bg-secondary-500 p-6 rounded-[16px] max-w-md mx-auto">
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <h2 className="text-xl font-bold text-white">Estado de Órdenes</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-white hover:text-gray-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              {orderData.length > 0 ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {orderData.map((order, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-bodyBold font-bold">
                            ID:
                          </span>
                          <span className="text-white font-body text-sm">
                            {order.id}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-white text-bodyBold font-bold">
                            Estado:
                          </span>
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-medium inline-block text-center min-w-[100px]
                            ${order.status === "PENDIENTE"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "REVISION"
                                  ? "bg-purple-100 text-purple-800"
                                  : order.status === "CONFIRMADO"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "FINALIZADO"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-white/80">No se encontraron órdenes</p>
                </div>
              )}
            </div>
          </Modal>
        </section>

        {/* Services Section */}
        <section className="w-full max-w-6xl pb-10">
          <div className="py-12 border-t border-white/20">
            <h2 className="mb-12 text-center text-white text-display3">
              Nuestros Servicios
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="text-white p-6 border border-white/50 rounded-[16px] bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                >
                  <h3 className="mb-4 text-white text-title1 lg:text-title2">
                    {service.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-white/90 text-subtitle2">
                    {service.description}
                  </p>
                  <div className="w-full h-48 overflow-hidden rounded-[16px]">
                    <img
                      className="object-cover w-full h-full"
                      src={service.img}
                      alt={service.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="pt-12 border-t border-white/20">
            <h2 className="mb-12 text-center text-white text-display3">
              ¿Por qué Elegirnos?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {chooseUs.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 transition-colors duration-300 lg:justify-center rounded-[16px]"
                >
                  <div className="flex items-center justify-center w-10 h-10 mr-4 font-bold text-white rounded-full bg-primary-500">
                    {index + 1}
                  </div>
                  <div className="text-lg text-white text-bodyBold">
                    {service.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center py-6">
            <img
              src="/celular-reparacion.png"
              alt="celular reparado"
              className="max-w-lg w-full rounded-[16px] shadow-lg"
            />
          </div>
        </section>
      </div>
      <ChatBotGemini />
    </PageTransition>
  );
}
