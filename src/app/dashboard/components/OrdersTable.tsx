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
  estadoColores,
}: OrdersTableProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center w-full px-4 py-2 mt-4 border rounded-[8px] border-gray-400 focus-within:border-primary-500 transition-colors duration-200">
        <input
          type="text"
          className="w-full outline-none text-sm"
          placeholder="Buscar orden..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        <i className="ml-2 text-gray-400 fa-solid fa-magnifying-glass"></i>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-4 gap-4 py-3 mb-2 text-sm font-semibold border-b border-gray-200">
            <div
              className="flex items-center gap-2 cursor-pointer px-4"
              onClick={onToggleSort}
            >
              <span>Fecha</span>
              {sortOrder === "asc" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            <div className="px-4">ID orden</div>
            <div className="px-4">
              {userRole === "Admin" ? "Técnico Asignado" : "Dispositivo"}
            </div>
            <div className="px-4">Estado</div>
          </div>

          <div className="space-y-1">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => onOrderClick(order)}
                className="grid grid-cols-4 gap-4 py-3 text-sm transition-colors duration-200 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <div className="px-4 truncate">{order.date}</div>
                <div className="px-4 overflow-hidden">
                  <span className="block truncate" title={order.id}>
                    {order.id}
                  </span>
                </div>
                <div className="px-4 truncate">
                  {userRole === "Admin"
                    ? order.assignedTechnician
                    : order.device}
                </div>
                <div
                  className={`px-4 font-medium ${estadoColores[order.status]}`}
                >
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
