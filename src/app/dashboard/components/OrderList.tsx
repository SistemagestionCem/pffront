import OrderRow from "./OrderRow";

type EstadoOrden = "Pendiente" | "Iniciado" | "Finalizado";

type DisplayOrder = {
  date: string;
  id: string;
  device: string;
  status: EstadoOrden;
  assignedTechnician: string;
};

interface OrderListProps {
  orders: DisplayOrder[];  // Usar DisplayOrder aquí
  setSelectedOrder: (order: DisplayOrder) => void;
  estadoColores: Record<string, string>;
}

const OrderList: React.FC<OrderListProps> = ({ orders, setSelectedOrder, estadoColores }) => {
  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <OrderRow
          key={order.id}
          order={order}
          onClick={() => setSelectedOrder(order)}
          estadoColores={estadoColores}
        />
      ))}
    </div>
  );
};

export default OrderList;

