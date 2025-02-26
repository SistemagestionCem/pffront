  export type EstadoOrden = "REVISION" | "CONFIRMADO" | "CANCELADO" | "FINALIZADO" | "REPARACION" | "PAGO" | "RETIRADO";

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
