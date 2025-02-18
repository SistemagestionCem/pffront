import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { OrderType } from "@/interfaces/index";

interface OrderDataStorageType {
  orderData: OrderType[]; // Array de órdenes
  setOrderData: (data: OrderType[]) => void;
  addOrder: (order: OrderType) => void;
  clearOrderData: () => void;
}

const orderDataStorage = create<OrderDataStorageType>()(
  devtools(
    persist(
      (set) => ({
        orderData: [], // Estado inicial vacío
        setOrderData: (data) => set({ orderData: data }), // Reemplaza todas las órdenes
        addOrder: (order) =>
          set((state) => ({ orderData: [...state.orderData, order] })), // Agrega una orden
        clearOrderData: () => set({ orderData: [] }), // Limpia todas las órdenes
      }),
      {
        name: "order-data", // Clave en storage
        storage: createJSONStorage(() => localStorage), // Guarda en localStorage
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
