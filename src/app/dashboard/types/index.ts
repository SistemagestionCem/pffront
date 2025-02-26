  export type EstadoOrden = "PENDIENTE" | "REVISION" | "CONFIRMADO" | "CANCELADO" | "FINALIZADO" | "REPARACION" | "PAGO" | "RETIRADO";

  export type DisplayOrder = {
    id: string;
    clientEmail: string;
    clientDni: number;
    equipmentType: string;
    imei: string;
    assignedTechnician?: string;
    description: string;
    status: EstadoOrden;
    payments: {
      externalOrderId: string | null;
      id: string;
      invoicePaidAt: string | null;
      price: string;
      status: string;
    } | null; // Permitir null
    date: string;
  };
