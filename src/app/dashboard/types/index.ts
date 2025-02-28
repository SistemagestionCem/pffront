  export type EstadoOrden = "PENDIENTE" | "REVISION" | "CONFIRMADO" | "CANCELADO" | "FINALIZADO" | "REPARACION" | "PAGO" | "RETIRADO";

  export type DisplayOrder = {
    id: string;
    clientEmail: string;
    clientDni: string;
    equipmentType: string;
    imei: string;
    assignedTechn?: {
      id: string;
      name: string;
      email: string;
      dni: string;
      phone: string;
      role: string;
      createdAt: string;
    } | null;
    description: string;
    status: EstadoOrden;
    payments: null | {
      externalOrderId: string | null;
      id: string;
      invoicePaidAt: string | null;
      price: string;
      status: string;
    };
    evidences?: {
      id: string;
      fileUrl: string;
    }[];
    date: string;
  };
  
