"use client";
import { useState, useEffect } from "react";
import { UserProfile } from "./components/UserProfile";
import { OrdersTable } from "./components/OrdersTable";
import ModalOrden from "./components/ModalOrden";
import ModalAgregarOrden from "./components/ModalAgregarOrden";
import userDataStorage from "@/storage/userStore";
import orderDataStorage from "@/storage/orderStore";
import PageTransition from "@/components/PageTransition";
import { OrderType } from "@/interfaces";
import UsersList from "./components/UsersList";
import { getAllOrders, updateOrderStatus, getOrderById  } from "@/services/orderService";
import { useRouter } from "next/navigation";
import OrderFilters from "./components/OrderFilters";

export default function DashboardTecnico() {
  const { orderData, addOrder, updateOrder } = orderDataStorage();
  const userData = userDataStorage((state) => state.userData);
  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder | null>(null);
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    email: "",
    rol: "",
    dni: "",
    phone: "",
  });
  const router = useRouter();

  type EstadoOrden =
    | "PENDIENTE"
    | "REVISION"
    | "CONFIRMADO"
    | "CANCELADO"
    | "REPARACION"
    | "FINALIZADO"
    | "PAGO"
    | "RETIRADO";

  type DisplayOrder = {
    id: string;
    clientEmail: string;
    clientDni: string;
    equipmentType: string;
    imei: string;
    assignedTechn?: {
      id: string;
      name: string;
      email: string;
      dni: string;
      phone: string;
      role: string;
      createdAt: string;
    } | null;
    description: string;
    status: EstadoOrden;
    payments: null | {
      externalOrderId: string | null;
      id: string;
      invoicePaidAt: string | null;
      price: string;
      status: string;
    };
    date: string;
    evidences?: { 
      id: string; 
      fileUrl: string; 
    }[];
    createdAt?: string; 
  };

  const estadoColores: Record<EstadoOrden, string> = {
    PENDIENTE: "text-gray-500",
    REVISION: "text-blue-500",
    CONFIRMADO: "text-orange-500",
    CANCELADO: "text-red-600",
    REPARACION: "text-yellow-500",
    FINALIZADO: "text-green-500",
    PAGO: "text-black",
    RETIRADO: "text-black",
  };

  useEffect(() => {
  
    if (orderData) {
      const formattedOrders: DisplayOrder[] = orderData.map((order) => {
        return {
          id: order.id,
          clientEmail: order.clientEmail,
          clientDni: order.clientDni,
          equipmentType: order.equipmentType,
          imei: order.imei,
          assignedTechn: order.assignedTechn
            ? {
                id: order.assignedTechn.id,
                name: order.assignedTechn.name,
                email: order.assignedTechn.email,
                dni: order.assignedTechn.dni,
                phone: order.assignedTechn.phone,
                role: order.assignedTechn.role,
                createdAt: order.assignedTechn.createdAt,
              }
            : null,
          description: order.description,
          status: order.status as EstadoOrden,
          payments: order.payments
            ? {
                externalOrderId: order.payments.externalOrderId ?? null,
                id: order.payments.id ?? "",
                invoicePaidAt: order.payments.invoicePaidAt ?? null,
                price: order.payments.price ?? "0",
                status: order.payments.status ?? "Desconocido",
              }
            : null,
          date: order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("es-ES")
            : "Fecha desconocida",
            evidences: order.evidences || [] 
        };
        
      });
      setOrders(formattedOrders);
    }
  }, [orderData]); // Este efecto se ejecutará cada vez que orderData cambie

  useEffect(() => {
    if (userData) {
      setUsuario({
        id: userData.id,
        nombre: userData.name,
        email: userData.email,
        rol: userData.role,
        dni: userData.dni,
        phone: userData.phone,
      });
    }
  }, [userData]);

  useEffect(() => {
    const storedUser = userDataStorage.getState().userData;

    if (storedUser === undefined) return;

    if (!storedUser) {
      router.push("/login");
      return;
    }

    // Asegurarse de que el usuario tenga un rol
    if (!storedUser.role) {
      const updatedUser = {
        ...storedUser,
        role: "USER",
      };
      userDataStorage.setState({ userData: updatedUser });
    }
  }, [userData, router]);

  const fetchOrders = async () => {
    try {
      const allOrders = await getAllOrders(); // 🔹 Obtener todas las órdenes
  
      if (!allOrders || allOrders.length === 0) {
        console.log("No hay órdenes disponibles.");
        setOrders([]);
        return;
      }
  
      // 🔹 Verificar qué órdenes estamos obteniendo
      console.log("Órdenes obtenidas de getAllOrders:", allOrders);
  
      // 🔹 Obtener detalles de cada orden para asegurarnos de traer las evidencias
      const formattedOrders = await Promise.all(
        allOrders.map(async (order: DisplayOrder) => {
          console.log(`Llamando a getOrderById para la orden: ${order.id}`); // 🔹 Verificar si se está ejecutando
  
          const fullOrder = await getOrderById(order.id); // ✅ Obtener la orden con evidencias
  
          const updatedOrder = {
            ...order,
            date: order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("es-ES")
              : "Fecha desconocida",
            evidences: fullOrder?.evidences || [], // 🔹 Guardamos las evidencias
          };
  
          console.log("Orden después de getOrderById:", updatedOrder); // 🔹 Verificar si evidences está presente
          return updatedOrder;
        })
      );
  
      setOrders(formattedOrders); // 🔹 Guardamos las órdenes con sus evidencias en el estado
      console.log("Órdenes guardadas en el estado:", formattedOrders);
    } catch (error) {
      console.log("Error al actualizar las órdenes:", error);
    }
  };
  
    
  const handleEstadoChange = async (id: string, nuevoEstado: EstadoOrden) => {
    try {
      const response = await updateOrderStatus(id, nuevoEstado);
      console.log("Respuesta del servidor:", response);

      // Actualizar en el store
      const orderToUpdate = orderData.find((order) => order.id === id);
      if (orderToUpdate) {
        const updatedOrder = {
          ...orderToUpdate,
          status: nuevoEstado,
        };
        updateOrder(updatedOrder);
      }
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
      assignedTechn: newOrder.assignedTechn ?? null,
      description: newOrder.description,
      status: newOrder.status,
      payments: newOrder.payments,
      date: new Date(newOrder.createdAt).toLocaleDateString("es-ES"),
    };

    setOrders((prevOrders) => [...prevOrders, formattedOrder]);
  };

// Esta función debe ir en el componente que maneja las órdenes (no en el filtro).
const [filteredOrders, setFilteredOrders] = useState(orders);



  return (
    <PageTransition>
      <div className="container mt-[72px] space-y-8 min-h-screen text-white px-[5vw] py-6 mx-auto">
        <h1 className="text-center text-white text-display3">
          Dashboard de {usuario.rol}
        </h1>

        <UserProfile
          id={usuario.id}
          nombre={usuario.nombre}
          email={usuario.email}
          rol={usuario.rol}
          phone={usuario.phone}
          dni={usuario.dni}
        />

        <div>

        </div>

        <div className="flex flex-col gap-8 pb-8">
        
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

            {/* Filtros */}
            <OrderFilters orders={orders} onFilterChange={setFilteredOrders} />

            <OrdersTable
              orders={filteredOrders}
              userRole={usuario.rol}
              searchTerm={searchTerm}
              onOrderClick={setSelectedOrder}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              estadoColores={estadoColores}
              fetchOrders={fetchOrders}
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