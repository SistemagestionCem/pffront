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
  id?: string;
  clientEmail: string;
  clientDni: string;
  equipmentType: string;
  imei: string;
  assignedTechnician: string ;
  description: string;
  status: "Pendiente" | "Iniciado" | "Finalizado";
}

Argument of type '{ assignedTechnician: string; clientDni: string; clientEmail: string; description: string; equipmentType: string; imei: string; status: string; user: string; createdAt: Date; id: string; }' is not assignable to parameter of type 'PostOrderType'.
  Types of property 'assignedTechnician' are incompatible.
    Type 'string' is not assignable to type '{ id: string; }

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
