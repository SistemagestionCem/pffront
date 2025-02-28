// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DisplayOrder, EstadoOrden } from "../types";
import { ImageUp, Eye } from "lucide-react";
import { useState } from "react";
import ModalEvidence from "./ModalEvidence";
import ViewEvidenceModal from "./ModalEvidenceView";

interface OrdersTableProps {
  orders: DisplayOrder[];
  userRole: string;
  searchTerm: string;
  onOrderClick: (order: DisplayOrder) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  estadoColores: Record<string, string>;
  fetchOrders: () => Promise<void>;
}

export const OrdersTable = ({
  orders,
  userRole,
  searchTerm,
  onOrderClick,
  onSearchChange,
  fetchOrders,
}: OrdersTableProps) => {
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder | null>(null);

  const handleOpenModal = (order: DisplayOrder) => {
    setSelectedOrder(order);
    setIsEvidenceModalOpen(true);
  };
  const handleOpenViewModal = (order: DisplayOrder) => {
    console.log("Order seleccionada:", order);
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="p-2 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Lista de órdenes
        </h2>
        <input
          type="text"
          className="w-full p-2 text-sm border border-gray-300 rounded-lg"
          placeholder="Buscar orden..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        <div className="overflow-x-auto mt-4 -mx-2 sm:mx-0 ">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead>
              <tr className="text-xs sm:text-sm bg-gray-50">
                <th
                  className="text-center p-2 sm:p-3 font-semibold text-gray-600 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Fecha</span>
                  </div>
                </th>
                <th className="text-center p-2 font-semibold text-gray-600">
                  ID orden
                </th>
                <th className="text-center p-2 font-semibold text-gray-600 hidden sm:table-cell">
                  {userRole === "ADMIN" ? "Técnico" : "Dispositivo"}
                </th>
                <th className="text-center p-2 font-semibold text-gray-600">
                  Estado
                </th>
                <th className="text-center p-2 font-semibold text-gray-600">
                  Tipo de Equipo
                </th>
                {userRole !== "CLIENT" && (
                  <>
                    <th className="text-center p-2 font-semibold text-gray-600 align-middle">
                      Evidencia
                    </th>
                    <th className="text-center p-2 font-semibold text-gray-600 align-middle">
                      Ver Evidencia
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="text-center text-xs sm:text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={(event) => {
                    if (
                      (event.target as HTMLElement).closest(".ignore-row-click")
                    )
                      return;
                    onOrderClick(order);
                  }}
                >
                  <td className="p-2 whitespace-nowrap">{order.date}</td>
                  <td className="p-2">
                    <span
                      className="block truncate max-w-[100px] sm:max-w-none"
                      title={order.id} // Tooltip con el ID completo
                    >
                      {order.id.slice(0, 4)}...{order.id.slice(-4)}
                    </span>
                  </td>
                  <td className="p-2 hidden sm:table-cell">
                    {userRole === "ADMIN"
                      ? order.assignedTechn?.name
                      : order.equipmentType}
                  </td>
                  <td className="p-2">
                    <span
                      className={`inline-block text-center w-24 px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "PENDIENTE"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "REVISION"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "CONFIRMADO"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "CANCELADO"
                                ? "bg-red-100 text-red-800"
                                : order.status === "REPARACION"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : order.status === "FINALIZADO"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "PAGO"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : order.status === "RETIRADO"
                                        ? "bg-teal-100 text-teal-800"
                                        : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2">{order.equipmentType}</td>
                  {userRole !== "CLIENT" && (
                    <>
                      <td className="p-2 text-center align-middle">
                        <ImageUp
                          size={18}
                          className="inline-block cursor-pointer text-gray-800 hover:text-gray-600 transition"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenModal(order);
                          }}
                        />
                      </td>
                      <td className="p-2 text-center align-middle">
                        <Eye
                          size={18}
                          className="inline-block cursor-pointer text-gray-800 hover:text-gray-600 transition"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenViewModal(order);
                          }}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalEvidence
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        order={selectedOrder}
        onUpdateOrder={fetchOrders}
      />
      <ViewEvidenceModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
      />
    </>
  );
};
