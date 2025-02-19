"use client";
// import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ModalOrden from "@/app/dashboard/components/ModalOrden";
import ModalAgregarOrden from "./components/ModalAgregarOrden";
import userDataStorage from "@/storage/userStore";
import orderDataStorage from "@/storage/orderStore";
import { users } from "@/helpers/users";
import { OrderType } from "@/interfaces";
import PageTransition from "@/components/PageTransition";
<<<<<<< Updated upstream
import UserInfo from "@/app/dashboard/components/UserInfo";
import SearchBar from "@/app/dashboard/components/SearchBar";
import OrderList from "./components/OrderList";
import UsersList from "./components/UsersList";
=======
import { postOrderService } from "@/services/orderService";
import { toast } from "sonner"; // Add this function if it
import useUsers from "./components/UsersFetch";
import { OrdersTable } from "./components/OrdersTable";
import { UserProfile } from "./components/UserProfile";

// Modal para agregar una nueva orden
interface ModalAgregarOrdenProps {
  isOpen: boolean;
  onClose: () => void;
  handleSaveOrder: (newOrder: OrderType) => void; // Añadido el tipo handleSaveOrder
}

const ModalAgregarOrden = ({ isOpen, onClose }: ModalAgregarOrdenProps) => {
  const { tecnicos, admin, clientes } = useUsers();

  const [orderData, setOrderData] = useState({
    assignedTechnician: "",
    cliente: "",
    description: "",
    equipmentType: "",
    imei: "",
    status: "Pendiente" as "Pendiente" | "Iniciado" | "Finalizado",
    user: "",
    createdAt: new Date(),
    id: Date.now().toString(),
  });

  const handleSubmit = async () => {
    const selectAdmin = admin[0];
    const payload = {
      userId: selectAdmin.id,
      clientId: orderData.cliente,
      assignedTechnicianId: orderData.assignedTechnician,
    };

    try {
      const response = await postOrderService(payload);
      if (response) {
        toast.success("Orden creada con éxito");
        onClose();
      }
    } catch (error) {
      toast.error("Error al crear la orden");
      console.error(error);
    }
  };

  return isOpen ? (
    <PageTransition>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 ">
        <div className="p-6 text-black bg-white rounded-[16px] w-96">
          <h2 className="mb-4 text-xl font-bold">Agregar Orden</h2>
          <div className="space-y-4">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.assignedTechnician}
              title="Tecnico"
              onChange={(e) =>
                setOrderData({
                  ...orderData,
                  assignedTechnician: e.target.value,
                })
              }
            >
              <option value="">Seleccionar técnico</option>
              {tecnicos.map((tecnico) => (
                <option key={tecnico.id} value={tecnico.id}>
                  {tecnico.name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.cliente}
              title="Cliente"
              onChange={(e) =>
                setOrderData({
                  ...orderData,
                  cliente: e.target.value,
                })
              }
            >
              <option value="">Seleccionar Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Descripción"
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.description}
              onChange={(e) =>
                setOrderData({ ...orderData, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Tipo de Dispositivo"
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.equipmentType}
              onChange={(e) =>
                setOrderData({ ...orderData, equipmentType: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="IMEI"
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.imei}
              onChange={(e) =>
                setOrderData({ ...orderData, imei: e.target.value })
              }
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={status}
              title="Estado"
              onChange={(e) =>
                setOrderData({
                  ...orderData,
                  status: e.target.value as
                    | "Pendiente"
                    | "Iniciado"
                    | "Finalizado",
                })
              }
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Iniciado">Iniciado</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 text-black bg-gray-300 rounded"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-white rounded bg-primary-500"
                onClick={handleSubmit}
              >
                Guardar Orden
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  ) : null;
};
>>>>>>> Stashed changes

export default function DashboardTecnico() {
  const { orderData, addOrder } = orderDataStorage();
  const userData = userDataStorage((state) => state.userData);
  const [mostrarOrdenes, setMostrarOrdenes] = useState(true);
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
<<<<<<< Updated upstream
      <div className="container mt-[72px] space-y-6 min-h-screen text-white px-[5vw] py-6  mx-auto">
        <h1 className="text-center text-white text-display3 ">
          Dashboard de {usuario.rol}
        </h1>
        
        <UserInfo usuario={usuario} />

=======
      <div className="container mt-[72px] space-y-8 min-h-screen text-white px-[5vw] py-6 mx-auto">
        <h1 className="text-center text-white text-display3">
          Dashboard de {usuario.rol}
        </h1>

        <UserProfile
          nombre={usuario.nombre}
          email={usuario.email}
          rol={usuario.rol}
        />
>>>>>>> Stashed changes

        <div className="gap-[auto] pb-8">
        <div className="flex justify-end">
          {usuario.rol === "ADMIN" && (
          <button
          onClick={() => setMostrarOrdenes(!mostrarOrdenes)}
          className="px-4 py-2 text-white font-bold rounded"
          >
            {mostrarOrdenes ? "Ver Usuarios" : "Ver Órdenes"}
          </button>)
          }
        </div>
          {mostrarOrdenes ?
          <section className="px-[16px] mx-auto max-w-3xl py-[16px] text-black bg-white rounded-[16px]">
            <div className="flex items-center justify-between pb-2 border-b title1 text-primary-500 border-primary-900">
            <h3>Ordenes</h3>
              {usuario.rol === "ADMIN" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1 ml-4 text-sm text-white rounded-[16px] bg-primary-500"
                >
                  Agregar Orden
                </button>
              )}
              </div>

<<<<<<< Updated upstream
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="mt-4">

              <div className="grid grid-cols-4 gap-4 py-2 mb-2 text-sm font-semibold border-b border-gray-200">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleSortOrder}
                >
                  Fecha{" "}
                  {sortOrder === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                <div>ID orden</div>
                <div>
                  {usuario.rol === "Admin" ? "Técnico Asignado" : "Dispositivo"}
                </div>
                <div>Estado</div>
              </div>

              <OrderList orders={filteredOrders} setSelectedOrder={setSelectedOrder} estadoColores={estadoColores} />
            </div>
=======
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
>>>>>>> Stashed changes

          </section>
          :
          <section className="px-[16px] mx-auto max-w-3xl py-[16px] text-black bg-white rounded-[16px]">
            <UsersList/>
          </section>
          }
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
