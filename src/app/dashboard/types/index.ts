export type EstadoOrden = "Pendiente" | "Iniciado" | "Finalizado";

export type DisplayOrder = {
  date: string;
  id: string;
  device: string;
  status: EstadoOrden;
  assignedTechnician: string;
};
