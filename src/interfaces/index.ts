export interface FormDataType {
  email: string;
  password: string;
}

export interface RegisterFormType {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface OrderType {
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
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  createdAt: Date;
}

export interface PostOrderType {
  userId: string;
  // clientEmail: string;
  clientId: string;
  // equipmentType: string;
  // imei: string;
  assignedTechnicianId: string;
  // description: string;
  // status: "Pendiente" | "Iniciado" | "Finalizado";
}

export interface OrdeType {
  id: string;
  clientEmail: string;
  clientDni: number;
  equipmentType: string;
  imei: string;
  assignedTechnician: string;
  description: string;
  status: "Pendiente" | "Iniciado" | "Finalizado";
  user: string;
  date: string;
}
