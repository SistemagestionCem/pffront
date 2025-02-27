import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

// Define el tipo de los datos del usuario
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  dni: number;
  phone: string;
}

// Define el tipo del store
interface UserDataStorageType {
  userData: UserData | null; // userData puede ser null si no está disponible
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}

const userDataStorage = create<UserDataStorageType>()(
  devtools(
    persist(
      (set) => ({
        userData: null, // Estado inicial del usuario
        setUserData: (data: UserData) => set({ userData: data }), // Función para actualizar el usuario
        clearUserData: () => set({ userData: null }), // Función para limpiar el estado del usuario
      }),
      {
        name: "user-data", // Nombre de la clave en localStorage
        storage: createJSONStorage(() => localStorage), // Especifica localStorage como almacenamiento
      }
    )
  )
);

export default userDataStorage;
