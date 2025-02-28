export interface FormDataType {
  email: string;
  password: string;
}

export interface RegisterFormType {
  name: string;
  email: string;
  password: string;
  phone: string;
  dni: string;
}

export interface OrderType {
  id: string;
  clientEmail: string;
  clientDni: string;
  equipmentType: string;
  imei: string;
  assignedTechn: {
    id: string;
    name: string;
    email: string;
    dni: string;
    phone: string;
    role: string;
    createdAt: string;
  } | null; // Puede ser null si no hay técnico asignado
  description: string;
  status:
    | "PENDIENTE"
    | "REVISION"
    | "CONFIRMADO"
    | "CANCELADO"
    | "REPARACION"
    | "FINALIZADO"
    | "PAGO"
    | "RETIRADO";
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
  };
  payments: null | {
    externalOrderId: string | null;
    id: string;
    invoicePaidAt: string | null;
    price: string;
    status: string;
  };
  createdAt: Date;
  statusHistory: []; // Array de historial de estado
  isActive: boolean;
  evidences?: { 
    id: string; 
    fileUrl: string; 
   }[];
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
  technName: string;
  description: string;
}

export interface OrdeType {
  id: string;
  clientEmail: string;
  clientDni: string;
  equipmentType: string;
  imei: string;
  assignedTechnician: string;
  description: string;
  status: "PENDIENTE" | "INICIADO" | "FINALIZADO";
  payments: number;
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
  status:
    | "PENDIENTE"
    | "REVISION"
    | "CONFIRMADO"
    | "CANCELADO"
    | "REPARACION"
    | "FINALIZADO"
    | "PAGO"
    | "RETIRADO";
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
export interface GoogleUserData {
  name: string | null;
  email: string | null;
  role: "USER";
  dni: string;
  phone: string;
}
