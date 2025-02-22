"use client";
import { useState, useEffect } from "react";
import { UserProfile } from "./components/UserProfile";
import { OrdersTable } from "./components/OrdersTable";
import ModalOrden from "./components/ModalOrden";
import ModalAgregarOrden from "./components/ModalAgregarOrden";
import userDataStorage from "@/storage/userStore";
import orderDataStorage from "@/storage/orderStore";
import PageTransition from "@/components/PageTransition";
import { users } from "@/helpers/users";
import { OrderType } from "@/interfaces";
import UsersList from "./components/UsersList";

export default function DashboardTecnico() {
  const { orderData, addOrder, updateOrder } = orderDataStorage();
  const userData = userDataStorage((state) => state.userData);
  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder | null>(null);
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    rol: "",
    dni: 0,    
    phone: "",  
  });

  type EstadoOrden = "PENDIENTE" | "REVISION" | "CONFIRMADO" | "CANCELADO" | "REPARACION" | "FINALIZADO";

  type DisplayOrder = {
    id: string;
    clientEmail: string;
    clientDni: number;
    equipmentType: string;
    imei: string;
    assignedTechnician?: string;
    description: string;
    status: EstadoOrden;
    payment: null | {
      externalOrderId: string | null;
      id: string;
      invoicePaidAt: string | null;
      price: string;
      status: string;
    };
    date: string;
  };
  

  const estadoColores = {
    Iniciado: "text-blue-500",
    Pendiente: "text-orange-500",
    Finalizado: "text-primary-500",
  };

  useEffect(() => {
    
    if (orderData) {
      const formattedOrders: DisplayOrder[] = orderData.map((order) => {
        const technician = users.find((user) => user.id === order.assignedTechnician);
      
        return {
          id: order.id,
          clientEmail: order.clientEmail,
          clientDni: order.clientDni,
          equipmentType: order.equipmentType,
          imei: order.imei,
          assignedTechnician: technician?.name || "No asignado",
          description: order.description,
          status: order.status as EstadoOrden,
          payment: order.payment
            ? {
                externalOrderId: order.payment.externalOrderId ?? null,
                id: order.payment.id ?? "",
                invoicePaidAt: order.payment.invoicePaidAt ?? null,
                price: order.payment.price ?? "0",
                status: order.payment.status ?? "Desconocido",
              }
            : null,
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString("es-ES") : "Fecha desconocida",
        };
      });
      setOrders(formattedOrders);
    }
  }, [orderData]); // Este efecto se ejecutará cada vez que orderData cambie

  useEffect(() => {
    if (userData) {
      setUsuario({
        nombre: userData.name || "",
        email: userData.email || "",
        rol: userData.role || "",
        dni: userData.dni || 0,  
        phone: userData.phone || "" 
      });
    }
  }, [userData]);

  // Modificar el handleEstadoChange
  const handleEstadoChange = async (id: string, nuevoEstado: EstadoOrden) => {
    try {
      // Actualizar en el store
      const orderToUpdate = orderData.find((order) => order.id === id);
      if (orderToUpdate) {
        const updatedOrder = {
          ...orderToUpdate,
          status: nuevoEstado,
        };
        updateOrder(updatedOrder);
      }

      // Actualizar el estado local
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: nuevoEstado } : order
        )
      );

      setSelectedOrder(null);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const handleSaveOrder = (newOrder: OrderType) => {
    addOrder(newOrder);
    const formattedOrder: DisplayOrder = {
      id: newOrder.id,
      clientEmail: newOrder.clientEmail,
      clientDni: newOrder.clientDni,
      equipmentType: newOrder.equipmentType,
      imei: newOrder.imei,
      assignedTechnician: newOrder.assignedTechnician || "No asignado",
      description: newOrder.description,
      status: newOrder.status,
      payment: newOrder.payment,
      date: new Date(newOrder.createdAt).toLocaleDateString("es-ES"),
    };

    setOrders((prevOrders) => [...prevOrders, formattedOrder]);
  };

  const filteredOrders = orders
    .filter((order) => {
      if (!searchTerm) return true;
      const searchTerms = searchTerm.toLowerCase().split(" ").filter(Boolean);
      return searchTerms.every(
        (term) =>
          order.id.toLowerCase().includes(term) ||
          order.equipmentType.toLowerCase().includes(term) ||
          order.status.toLowerCase().includes(term) ||
          order.date.toLowerCase().includes(term)
      );
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <PageTransition>
      <div className="container mt-[72px] space-y-8 min-h-screen text-white px-[5vw] py-6 mx-auto">
        <h1 className="text-center text-white text-display3">
          Dashboard de {usuario.rol}
        </h1>

        <UserProfile
          nombre={usuario.nombre}
          email={usuario.email}
          rol={usuario.rol}
          phone={usuario.phone}
          dni={usuario.dni}
        />

        <div className="flex flex-col gap-8 pb-8">
          {/* Sección de Órdenes */}
          <section className="px-[16px] mx-auto w-full max-w-3xl py-[16px] text-black bg-white rounded-[16px]">
            <h3 className="flex items-center justify-between pb-2 border-b title1 text-primary-500 border-primary-900">
              Órdenes
              {usuario.rol === "ADMIN" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1 ml-4 text-sm text-white rounded-[16px] bg-primary-500 hover:bg-primary-600 transition-colors"
                >
                  Agregar Orden
                </button>
              )}
            </h3>

            <OrdersTable
              orders={filteredOrders}
              sortOrder={sortOrder}
              userRole={usuario.rol}
              searchTerm={searchTerm}
              onOrderClick={setSelectedOrder}
              onToggleSort={toggleSortOrder}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              estadoColores={estadoColores}
            />
          </section>

          {/* Sección de Usuarios (solo para admin) */}
          {usuario.rol === "ADMIN" && (
            <section className="px-[16px] mx-auto w-full max-w-3xl py-[16px] text-black bg-white rounded-[16px]">
              <h3 className="pb-2 border-b title1 text-primary-500 border-primary-900">
                Gestión de Usuarios
              </h3>
              <UsersList />
            </section>
          )}

          <ModalOrden
            isOpen={!!selectedOrder}
            onClose={() => setSelectedOrder(null)}
            order={selectedOrder!}
            handleEstadoChange={handleEstadoChange}
          />
          <ModalAgregarOrden
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            handleSaveOrder={handleSaveOrder}
          />
        </div>
      </div>
    </PageTransition>
  );
}
