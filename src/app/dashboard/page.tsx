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
  const { orderData, addOrder } = orderDataStorage();
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
  });

  type EstadoOrden = "Actualizar" | "Pendiente" | "Iniciado" | "Finalizado";

  type DisplayOrder = {
    date: string;
    id: string;
    device: string;
    status: EstadoOrden;
    assignedTechnician: string;
  };

  const estadoColores = {
    Iniciado: "text-blue-500",
    Pendiente: "text-orange-500",
    Finalizado: "text-primary-500",
  };

  useEffect(() => {
    if (orderData) {
      const formattedOrders: DisplayOrder[] = orderData.map((order) => {
        const technician = users.find(
          (user) => user.id === order.assignedTechnician
        );

        return {
          date: new Date(order.createdAt).toLocaleDateString("es-ES"),
          id: order.id,
          device: order.equipmentType,
          status: order.status,
          assignedTechnician: technician?.name || "No asignado",
        };
      });
      setOrders(formattedOrders);
    }
  }, [orderData]);

  useEffect(() => {
    if (userData) {
      setUsuario({
        nombre: userData.name || "",
        email: userData.email || "",
        rol: userData.role || "",
      });
    }
  }, [userData]);

  const handleEstadoChange = (id: string, nuevoEstado: EstadoOrden) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: nuevoEstado } : order
      )
    );
    setSelectedOrder(null);
  };

  const handleSaveOrder = (newOrder: OrderType) => {
    addOrder(newOrder);
    const formattedOrder: DisplayOrder = {
      date: new Date(newOrder.createdAt).toLocaleDateString("es-ES"),
      id: newOrder.id,
      device: newOrder.equipmentType,
      status: newOrder.status,
      assignedTechnician: newOrder.assignedTechnician || "No asignado",
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
          order.device.toLowerCase().includes(term) ||
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
        />

        <div className="gap-[auto] pb-8">
          <section className="px-[16px] mx-auto max-w-3xl py-[16px] text-black bg-white rounded-[16px]">
            <h3 className="flex items-center justify-between pb-2 border-b title1 text-primary-500 border-primary-900">
              Ordenes
              {usuario.rol === "ADMIN" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1 ml-4 text-sm text-white rounded-[16px] bg-primary-500"
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
            <UsersList/>

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
