import { create } from "zustand";


interface MontoState {
  orderId: string | null;
  monto: number;
  setMonto: (value: number, orderId: string) => void;
  resetMonto: () => void;
}


export const useMontoStore = create<MontoState>((set) => ({
  orderId: null,
  monto: 0, 
  setMonto: (value, orderId) => set({ monto: value, orderId }),
  resetMonto: () => set({ monto: 0, orderId: null }),
}));
