/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ModalOrden from "./components/ModalOrden"; // Importamos el modal
import userDataStorage from "@/storage/userStore";
import orderDataStorage from "@/storage/orderStore";
import { users } from "@/helpers/users";
import { EstadoOrden, Order, DisplayOrder, Usuario } from "@/interfaces";
import PageTransition from "@/components/PageTransition";

// Modal para agregar una nueva orden
const ModalAgregarOrden = ({
  isOpen,
  onClose,
  handleSaveOrder,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleSaveOrder: (order: Order) => void;
}) => {
  const [assignedTechnician, setAssignedTechnician] = useState("");
  const [clientDni, setClientDni] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [imei, setImei] = useState("");
  const [status, setStatus] = useState<"Pendiente" | "Iniciado" | "Finalizado">(
    "Pendiente"
  );

  const handleSubmit = () => {
    const newOrder = {
      assignedTechnician,
      clientDni: Number(clientDni),
      clientEmail,
      description,
      equipmentType,
      imei,
      status,
      createdAt: new Date(),
      id: Date.now().toString(), // Generar un ID único para la nueva orden
      user: "", // Asignar un usuario si es necesario
    };
    handleSaveOrder(newOrder);
    onClose();
  };

  return isOpen ? (
    <PageTransition>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 ">
        <div className="p-6 text-black bg-white rounded-[16px] w-96">
          <h2 className="mb-4 text-xl font-bold">Agregar Orden</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Asignar Técnico"
              className="w-full p-2 border border-gray-300 rounded"
              value={assignedTechnician}
              onChange={(e) => setAssignedTechnician(e.target.value)}
            />
            <input
              type="text"
              placeholder="DNI Cliente"
              className="w-full p-2 border border-gray-300 rounded"
              value={clientDni}
              onChange={(e) => setClientDni(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Cliente"
              className="w-full p-2 border border-gray-300 rounded"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripción"
              className="w-full p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tipo de Dispositivo"
              className="w-full p-2 border border-gray-300 rounded"
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
            />
            <input
              type="text"
              placeholder="IMEI"
              className="w-full p-2 border border-gray-300 rounded"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "Pendiente" | "Iniciado" | "Finalizado"
                )
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

export default function DashboardTecnico() {
  const { orderData, addOrder } = orderDataStorage();
  const userData = userDataStorage((state) => state.userData);

  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder | null>(null);
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    email: "",
    rol: "",
  });

  const estadoColores: Record<EstadoOrden, string> = {
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
          status: order.status as EstadoOrden,
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

  const handleSaveOrder = (newOrder: Order) => {
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
      <div className="container mt-[72px] space-y-8 min-h-screen text-white px-[5vw] py-6  mx-auto">
        <h1 className="text-white text-display3 text-center ">
          Dashboard de {usuario.rol}
        </h1>
        <div className="gap-16 max-w-[400px] mx-auto">
          <section className="p-4 my-4 text-black bg-white rounded-[16px]">
            <h3 className="py-2 border-b title1 text-primary-500 border-primary-900">
              Datos de Usuario
            </h3>
            <div className="mt-4 space-y-4">
              <p className="flex items-center gap-4 bodyBold ">
                <img src="/svg/user.svg" alt="Usuario" className="w-6 h-6" />
                {usuario.nombre}
              </p>

              <p className="flex items-center gap-4 bodyBold">
                <img src="/svg/mail.svg" alt="Mail" className="w-6 h-6" />
                {usuario.email}
              </p>

              <p className="flex items-center gap-4 bodyBold">
                <img src="/svg/rol.svg" alt="rol" className="w-6 h-6" />
                {usuario.rol}
              </p>
            </div>
          </section>
        </div>

        <div className="gap-[auto] pb-8">
          <section className="px-[16px] mx-auto max-w-3xl py-[16px] text-black bg-white rounded-[16px]">
            <h3 className="flex items-center justify-between pb-2 border-b title1 text-primary-500 border-primary-900">
              Ordenes
              {usuario.rol === "Admin" && (
                <button
                  onClick={() => setIsModalOpen(true)} // Abrir modal de agregar orden
                  className="px-3 py-1 ml-4 text-sm text-white rounded-[16px] bg-primary-500"
                >
                  Agregar Orden
                </button>
              )}
            </h3>

            <div className="flex items-center w-full px-4 py-2 mt-4 border rounded-[8px] border-gray-400 focus-within:border-primary-500 transition-colors duration-200">
              <input
                type="text"
                className="flex-1 outline-none"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass text-gray-400 ml-2"></i>
            </div>

            <div className="mt-4">
              {/* Header */}
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

              {/* Rows */}
              <div className="space-y-2">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="grid grid-cols-4 gap-4 py-2 text-sm border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div>{order.date}</div>
                    <div className="overflow-hidden">
                      <span className="block truncate" title={order.id}>
                        {order.id}
                      </span>
                    </div>
                    <div>
                      {usuario.rol === "Admin"
                        ? order.assignedTechnician
                        : order.device}
                    </div>
                    <div
                      className={`font-bold ${
                        estadoColores[order.status as EstadoOrden]
                      }`}
                    >
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

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
