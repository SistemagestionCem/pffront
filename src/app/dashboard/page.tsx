/* eslint-disable @next/next/no-img-element */
"use client";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ModalOrden from "./components/ModalOrden"; // Importamos el modal
import userDataStorage from "@/storage/userStore";
import orderDataStorage from "@/storage/orderStore";

// Modal para agregar una nueva orden
const ModalAgregarOrden = ({
  isOpen,
  onClose,
  handleSaveOrder,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleSaveOrder: (order: any) => void;
}) => {
  const [assignedTechnician, setAssignedTechnician] = useState("");
  const [clientDni, setClientDni] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [imei, setImei] = useState("");
  const [status, setStatus] = useState("Pendiente");

  const handleSubmit = () => {
    const newOrder = {
      assignedTechnician,
      clientDni,
      clientEmail,
      description,
      equipmentType,
      imei,
      status,
      createdAt: new Date().toISOString(),
      id: Date.now().toString(), // Generar un ID único para la nueva orden
      user: "", // Asignar un usuario si es necesario
    };
    handleSaveOrder(newOrder);
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="p-6 text-black bg-white rounded-lg w-96">
        <h3 className="mb-4 text-xl font-bold">Agregar Orden</h3>
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
            onChange={(e) => setStatus(e.target.value)}
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
  ) : null;
};

export default function DashboardTecnico() {
  type EstadoOrden = "Pendiente" | "Iniciado" | "Finalizado";

  const [selectedOrder, setSelectedOrder] = useState<{
    date: string;
    id: string;
    device: string;
    status: EstadoOrden;
  } | null>(null);

  const { orderData, addOrder } = orderDataStorage();
  const [orders, setOrders] = useState<
    { date: string; id: string; device: string; status: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para abrir/ocultar modal de agregar orden

  useEffect(() => {
    if (orderData) {
      const formattedOrders = orderData.map((order) => ({
        date: new Date(order.createdAt).toLocaleDateString("es-ES"),
        id: order.id,
        device: order.equipmentType,
        status: order.status,
      }));
      setOrders(formattedOrders);
    }
  }, [orderData]);

  const handleEstadoChange = (id: string, nuevoEstado: EstadoOrden) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: nuevoEstado } : order
      )
    );
    setSelectedOrder(null);
  };

  const handleSaveOrder = (newOrder: any) => {
    addOrder(newOrder); // Guardar la nueva orden en el store de Zustand
    const formattedOrder = {
      date: new Date(newOrder.createdAt).toLocaleDateString("es-ES"),
      id: newOrder.id,
      device: newOrder.equipmentType,
      status: newOrder.status,
    };
    setOrders((prevOrders) => [...prevOrders, formattedOrder]); // Añadir la orden a la lista local
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredOrders = orders
    .filter((order) => {
      const searchTerms = searchTerm.toLowerCase().split(" ").filter(Boolean);
      return searchTerms.every(
        (term) =>
          order.id.includes(term) ||
          order.device.toLowerCase().includes(term) ||
          order.status.toLowerCase().includes(term) ||
          order.date.includes(term)
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

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    rol: "",
  });

  const estadoColores = {
    Iniciado: "text-blue-500",
    Pendiente: "text-orange-500",
    Finalizado: "text-primary-500",
  };
  const userData = userDataStorage((state) => state.userData);

  useEffect(() => {
    setUsuario({
      nombre: userData.name,
      email: userData.email,
      rol: userData.role,
    });
    console.log(userData);
  }, []);

    return (
        <div className="max-w-[768px] min-h-screen text-white p-4 sm:p-8 max-w-screen-lg mx-auto">

            <div className="gap-16 px-4">

                <section className="bg-white text-black p-4 rounded-lg my-4">
                    <h3 className="title1 text-primary-500 border-b border-primary-900 pb-2">Datos de Usuario</h3>
                    <div className="mt-2 space-y-4">

                        <p className="flex items-center gap-4 bodyBold "><img src="/svg/user.svg" alt="Usuario" className="w-6 h-6" />
                            {usuario.nombre}
                        </p>

                        <p className="flex items-center gap-4 bodyBold"><img src="/svg/mail.svg" alt="Mail" className="w-6 h-6" />
                            {usuario.email}
                        </p>

                        <p className="flex items-center gap-4 bodyBold"><img src="/svg/rol.svg" alt="rol" className="w-6 h-6" />
                            {usuario.rol}
                        </p>
                    </div>
                </section>
            </div>

      <div className="gap-16 p-4 pb-8">
        <section className="p-4 my-4 text-black bg-white rounded-lg">
          <h3 className="flex items-center justify-between pb-2 border-b title1 text-primary-500 border-primary-900">
            Ordenes
            {usuario.rol === "Admin" && (
              <button
                onClick={() => setIsModalOpen(true)} // Abrir modal de agregar orden
                className="px-3 py-1 ml-4 text-sm text-white rounded-lg bg-primary-500"
              >
                Agregar Orden
              </button>
            )}
          </h3>

          <div className="flex items-center w-full px-3 py-2 mt-4 border rounded-lg border-primary-500">
            <input
              type="text"
              className="flex-1 outline-none"
              placeholder="Buscar por ID, dispositivo, estado o fecha"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="title3">
                <th
                  className="flex items-center p-2 text-sm cursor-pointer"
                  onClick={toggleSortOrder}
                >
                  Fecha{" "}
                  {sortOrder === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </th>
                <th className="p-2 text-sm">ID orden</th>
                <th className="p-2 text-sm">Dispositivo</th>
                <th className="p-2 text-sm">Estado</th>
              </tr>
            </thead>
            <tbody className="text-center text-black body">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="flex p-2">{order.date}</td>
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.device}</td>
                  <td
                    className={`p-2 font-bold ${estadoColores[order.status]}`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  );
}
