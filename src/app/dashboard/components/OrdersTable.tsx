import { ChevronUp, ChevronDown } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DisplayOrder, EstadoOrden } from "../types";



interface OrdersTableProps {
  orders: DisplayOrder[];
  sortOrder: "asc" | "desc";
  userRole: string;
  searchTerm: string;
  onOrderClick: (order: DisplayOrder) => void;
  onToggleSort: () => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  estadoColores: Record<string, string>;
}

export const OrdersTable = ({
  orders,
  sortOrder,
  userRole,
  searchTerm,
  onOrderClick,
  onToggleSort,
  onSearchChange,
}: OrdersTableProps) => {
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
                  onClick={onToggleSort}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Fecha</span>
                    {sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </th>
                <th className="text-center p-2 font-semibold text-gray-600">ID orden</th>
                <th className="text-center p-2 font-semibold text-gray-600 hidden sm:table-cell">
                  {userRole === "Admin" ? "Técnico" : "Dispositivo"}
                </th>
                <th className="text-center p-2 font-semibold text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="text-center text-xs sm:text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => onOrderClick(order)}
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
                    {userRole === "Admin"
                      ? order.assignedTechnician
                      : order.device}
                  </td>
                  <td className="p-2">
                    <span
                      className={`inline-block text-center w-24 px-2 py-1 text-xs font-semibold rounded-full ${order.status === "Actualizar"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Pendiente"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Iniciado"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Finalizado"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
