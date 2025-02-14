/* eslint-disable @next/next/no-img-element */
"use client";

import PageTransition from "@/components/PageTransition";
import { getOrderByEmail } from "@/services/orderService";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/ModalHome";
import { OrderByMail } from "@/interfaces";
import { useEffect } from "react";

export default function Home() {
  const [userEmail, setUserEmail] = useState({
    email: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderByMail[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await getOrderByEmail(userEmail.email);
      console.log("respuesta del server", response);
      if (response) {
        setOrderData(response);
        setModalOpen(true);
      }
    } catch (error) {
      toast.error("Error al crear la orden");
      console.log(error);
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
      img: "/baterias.jpg",
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
              placeholder="Rastrea tu orden"
              className="py-[10px] px-[16px] w-full text-center bg-white/90 rounded-[8px] placeholder-gray-500 outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 border border-transparent"
              value={userEmail.email}
              onChange={(e) =>
                setUserEmail({
                  ...userEmail,
                  email: e.target.value,
                })
              }
            />
            <button className="py-[10px] px-[16px]  bg-primary-500 mt-4 w-full rounded-[16px] text-white text-title2 hover:bg-primary-600 transition-colors">
              <i className="mr-2 fa-solid fa-xs fa-magnifying-glass"></i>Buscar
            </button>
          </form>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="mb-4 text-xl font-bold">Detalles de la Orden</h2>
            {orderData.length > 0 ? (
              orderData.map((order, index) => (
                <div key={index} className="pb-2 mb-4 border-b">
                  <p>
                    <strong>ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.clientEmail}
                  </p>
                  <p>
                    <strong>Historial:</strong> {order.statusHistory}
                  </p>
                  <p>
                    <strong>Estado:</strong> {order.status}
                  </p>
                </div>
              ))
            ) : (
              <p>Cargando...</p>
            )}
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
    </PageTransition>
  );
}
