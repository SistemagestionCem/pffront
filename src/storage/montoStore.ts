import { create } from "zustand";

interface MontoState {
  monto: number;
  setMonto: (value: number) => void;
}

export const useMontoStore = create<MontoState>((set) => ({
  monto: 0, 
  setMonto: (value) => set({ monto: value }),
}));
