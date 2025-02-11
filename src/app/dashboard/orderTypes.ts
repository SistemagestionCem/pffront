 type Order= {
    id: string;
    clientEmail: string;
    clientDni: number;
    equipmentType: string;
    imei: string;
    assignedTechnician: string;
    description: string;
    status: "Pendiente" | "Iniciado" | "Finalizado";
    user: string;
    createdAt: Date;
  };

  

  export default Order;
  