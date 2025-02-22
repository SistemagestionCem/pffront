  export type EstadoOrden = "PENDIENTE" | "REVISION" | "CONFIRMADO" | "CANCELADO";

  export type DisplayOrder = {
    id: string;
    clientEmail: string;
    clientDni: number;
    equipmentType: string;
    imei: string;
    assignedTechnician?: string;
    description: string;
    status: EstadoOrden;
    payment: {
      externalOrderId: string | null;
      id: string;
      invoicePaidAt: string | null;
      price: string;
      status: string;
    } | null; // Permitir null
    date: string;
  };
