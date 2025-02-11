import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface Order {
  id: string;
  clientEmail: string;
  clientDni: number;
  equipmentType: string;
  imei: string;
  assignedTechnician: string;
  description: string;
  status: string;
  user: string;
  createdAt: Date;
}

interface OrderDataStorageType {
  orderData: Order[]; // Array de órdenes
  setOrderData: (data: Order[]) => void;
  addOrder: (order: Order) => void;
  clearOrderData: () => void;
}

const orderDataStorage = create<OrderDataStorageType>()(
  devtools(
    persist(
      (set) => ({
        orderData: [], // Estado inicial vacío
        setOrderData: (data) => set({ orderData: data }), // Reemplaza todas las órdenes
        addOrder: (order) => set((state) => ({ orderData: [...state.orderData, order] })), // Agrega una orden
        clearOrderData: () => set({ orderData: [] }), // Limpia todas las órdenes
      }),
      {
        name: "order-data", // Clave en storage
        storage: createJSONStorage(() => sessionStorage), // Guarda en sessionStorage
        partialize: (state) => ({
          orderData: state.orderData.map((order) => ({
            ...order,
            createdAt: order.createdAt.toISOString(), // Convierte Date a string para el storage
          })),
        }),
      }
    )
  )
);

export default orderDataStorage;
