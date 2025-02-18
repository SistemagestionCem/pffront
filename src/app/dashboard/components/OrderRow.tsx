interface OrderRowProps {
    order: {
      date: string;
      id: string;
      device: string;
      status: string;
      assignedTechnician: string;
    };
    onClick: () => void;
    estadoColores: Record<string, string>;
  }
  
  const OrderRow: React.FC<OrderRowProps> = ({ order, onClick, estadoColores }) => {
    return (
      <div
        onClick={onClick}
        className="grid grid-cols-4 gap-4 py-2 text-sm transition-colors duration-200 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
      >
        <div>{order.date}</div>
        <div className="overflow-hidden">
          <span className="block truncate" title={order.id}>
            {order.id}
          </span>
        </div>
        <div>{order.assignedTechnician || order.device}</div>
        <div className={`font-bold ${estadoColores[order.status]}`}>{order.status}</div>
      </div>
    );
  };
  
  export default OrderRow;