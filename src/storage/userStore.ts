import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface userDataStorageType {
    userData: any;
    setUserData: (data: any) => void;
    clearUserData: () => void;
}

const userDataStorage = create<userDataStorageType>()(
  devtools(
    persist(
      (set) => ({
        userData: null, // Estado inicial del usuario
        setUserData: (data: any) => set({ userData: data }), // Función para actualizar el usuario
        clearUserData: () => set({ userData: null }), // Función para limpiar el estado del usuario
      }),
      {
        name: "user-data", // Nombre de la clave en localStorage
        storage: createJSONStorage(() => sessionStorage), // Especifica localStorage como almacenamiento
      }
    )
  )
);

export default userDataStorage;


