export interface FormDataType {
  email: string;
  password: string;
}

export interface RegisterFormType {
  name: string;
  email: string;
  password: string;
  phone: string;
  dni: number;
}

export interface OrderType {
  id: string;
  clientEmail: string;
  clientDni: number;
  equipmentType: string;
  imei: string;
  assignedTechnician: string;
  description: string;
  status: "PENDIENTE" | "REVISION" | "CONFIRMADO" | "CANCELADO" | "REPARACION" | "FINALIZADO";
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
  };
  payment: null | {
    externalOrderId: string | null;
    id: string;
    invoicePaidAt: string | null;
    price: string;
    status: string;
  };
  createdAt: Date;
  statusHistory: []; // Array de historial de estado
  isActive: boolean;
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
  clientEmail: string;
  clientDni: number;
  equipmentType: string;
  imei: string;
  assignedTechnician: string;
  description: string;
}

export interface OrdeType {
  id: string;
  clientEmail: string;
  clientDni: number;
  equipmentType: string;
  imei: string;
  assignedTechnician: string;
  description: string;
  status: "PENDIENTE" | "INICIADO" | "FINALIZADO";
  payment: number;
  user: string;
  date: string;
}

export interface OrderByMail {
  id: string;
  status: string;
  clientEmail: string;
  statusHistory: string;
}

export interface OrdeTypeValidate {
  clientEmail: string;
  clientDni: string;
  equipmentType: string;
  imei: string;
  assignedTechnician: string;
  description: string;
  status: "PENDIENTE" | "INICIADO" | "FINALIZADO";
}

export interface OrderErrors {
  clientEmail: string;
  clientDni: string;
  equipmentType: string;
  imei: string;
  assignedTechnician: string;
  description: string;
  status: string;
}