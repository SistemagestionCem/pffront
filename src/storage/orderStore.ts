import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { OrderType } from "@/interfaces/index";

interface OrderDataStorageType {
  orderData: OrderType[];
  setOrderData: (data: OrderType[]) => void;
  addOrder: (order: OrderType) => void;
  updateOrder: (updatedOrder: OrderType) => void;
  clearOrderData: () => void;
}

const orderDataStorage = create<OrderDataStorageType>()(
  devtools(
    persist(
      (set) => ({
        orderData: [],
        setOrderData: (data) => set({ orderData: data }),
        addOrder: (order) =>
          set((state) => ({ orderData: [...state.orderData, order] })),
        updateOrder: (updatedOrder) =>
          set((state) => ({
            orderData: state.orderData.map((order) =>
              order.id === updatedOrder.id ? updatedOrder : order
            ),
          })),
        clearOrderData: () => set({ orderData: [] }),
      }),
      {
        name: "order-data",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          orderData: state.orderData.map((order) => ({
            ...order,
            createdAt: new Date(order.createdAt).toISOString(),
          })),
        }),
      }
    )
  )
);

export default orderDataStorage;
