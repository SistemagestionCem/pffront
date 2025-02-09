/* eslint-disable @next/next/no-img-element */
"use client";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import ModalOrden from "./components/ModalOrden"; // Importamos el modal

export default function DashboardTecnico() {
  type EstadoOrden = "En Proceso" | "Iniciado" | "Finalizado";

  const [selectedOrder, setSelectedOrder] = useState<{
    date: string;
    id: number;
    device: string;
    status: EstadoOrden;
  } | null>(null);

  const [orders] = useState<{ date: string; id: number; device: string; status: EstadoOrden }[]>([
    { date: "06/02/25", id: 1001, device: "Smartphone", status: "Iniciado" },
    { date: "06/02/25", id: 1002, device: "Tablet", status: "Finalizado" },
    { date: "07/02/25", id: 1003, device: "Smartwatch", status: "En Proceso" },
    { date: "07/02/25", id: 1004, device: "Laptop", status: "Iniciado" },
    { date: "08/02/25", id: 1005, device: "Smartphone", status: "Iniciado" },
    { date: "08/02/25", id: 1006, device: "Tablet", status: "Finalizado" },
    { date: "09/02/25", id: 1007, device: "Smartwatch", status: "En Proceso" },
    { date: "09/02/25", id: 1008, device: "Laptop", status: "Finalizado" },
    { date: "10/02/25", id: 1009, device: "Smartphone", status: "En Proceso" },
    { date: "10/02/25", id: 1010, device: "Tablet", status: "Iniciado" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredOrders = orders
    .filter((order) => {
      const searchTerms = searchTerm.toLowerCase().split(" ").filter(Boolean);

      return searchTerms.every(
        (term) =>
          order.id.toString().includes(term) ||
          order.device.toLowerCase().includes(term) ||
          order.status.toLowerCase().includes(term) ||
          order.date.includes(term)
      );
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    );

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const [usuario, setUsuario] = useState({
    //cuando conectemos la base setUsuario traera los datos ver persistencia
    nombre: "Gary Jair Casas Wong",
    email: "garyjair001@hotmail.com",
    rol: "Técnico",
  });

  const handleEstadoChange = (nuevoEstado: EstadoOrden) => {
    if (!orders) return;
  };

  const estadoColores = {
    Iniciado: "text-blue-500",
    "En Proceso": "text-orange-500",
    Finalizado: "text-primary-500",
  };

  return (
    <div className="max-w-[768px] min-h-screen text-white p-4 sm:p-8 max-w-screen-lg mx-auto">
      <div className="gap-16 px-4">
        <h2 className="display3  text-white flex justify-center w-full py-4">
          Dashboard de Técnico
        </h2>

        <section className="bg-white text-black p-4 rounded-lg my-4">
          <h3 className="title1 text-primary-500 border-b border-primary-900 pb-2">
            Datos de Usuario
          </h3>
          <div className="mt-2 space-y-4">
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

      <div className="gap-16 p-4 pb-8 ">
        <section className="bg-white text-black p-4 rounded-lg my-4">
          <div className="flex flex-col items-start gap-4 w-full"></div>
          <h3 className="title1 text-primary-500 border-b border-primary-900 pb-2">Ordenes</h3>
          <div className="mt-4 flex items-center rounded-lg px-3 py-2 border border-primary-500 w-full">
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
                <th className="p-2 flex items-center cursor-pointer " onClick={toggleSortOrder}>
                  Fecha {sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </th>
                <th className="p-2">ID orden</th>
                <th className="p-2">Dispositivo</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody className="text-black text-center body">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="p-2 flex">{order.date}</td>
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.device}</td>
                  <td className={`p-2 font-bold ${estadoColores[order.status]}`}>{order.status}</td>
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
      </div>
    </div>
  );
}
