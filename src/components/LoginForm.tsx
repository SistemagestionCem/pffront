"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userDataStorage from "@/storage/userStore";
import orderDataStorage from "@/storage/orderStore";
import { toast } from "sonner";
import { login } from "@/services/auth";
import { getOrderByEmail, getTechOrders } from "@/services/orderService";
import { OrderType } from "@/interfaces";

const LoginForm = () => {
  const router = useRouter();
  const { setUserData } = userDataStorage();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // State para los valores del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State para manejar los errores
  const [error, setError] = useState("");

  // Expresión regular para validar un correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handler para el submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!email || !password) {
      toast.error("Ambos campos son requeridos!", {
        style: {
          background: "red",
          position: "fixed",
        },
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast.warning("Por favor ingrese un email válido", {
        style: {},
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await login(email, password);
      if (response) {
        toast.success("Login successful!");
        console.log(response);
        setUserData({
          id: response.userFound.id,
          name: response.userFound.name,
          email: response.userFound.email,
          role: response.userFound.role,
        })
        if (response.userFound.role === "CLIENT") {
          const orders  = await getOrderByEmail(response.userFound.email)
          console.log("orders user:",orders)
          if (orders) {
            const ordersData = orders.map((order: OrderType) => ({
              id: order.id,
              clientEmail: order.clientEmail,
              clientDni: order.clientDni,
              equipmentType: order.equipmentType,
              imei: order.imei,
              assignedTechnician: order.assignedTechnician || "",
              description: order.description,
              status: order.status as "Actualizar" | "Pendiente" | "Iniciado" | "Finalizado",
              user: order.user,
              createdAt: new Date(), // O la fecha correspondiente
              statusHistory: order.statusHistory || [],
              isActive: order.isActive || false, // Asegurarte de que tenga valor por defecto
            }));
            
            orderDataStorage.getState().setOrderData(ordersData);
          }
        } else if (response.userFound.role === "TECHN") {
          const orders = await getTechOrders(response.userFound.id)
          console.log("orders tech:", orders)
          if (orders) {
            const ordersData = orders.map((order: OrderType) => ({
              id: order.id,
              clientEmail: order.clientEmail,
              clientDni: order.clientDni,
              equipmentType: order.equipmentType,
              imei: order.imei,
              assignedTechnician: order.assignedTechnician || "",
              description: order.description,
              status: order.status as "Actualizar" | "Pendiente" | "Iniciado" | "Finalizado",
              user: order.user,
              createdAt: new Date(), // O la fecha correspondiente
              statusHistory: order.statusHistory || [],
              isActive: order.isActive || false, // Asegurarte de que tenga valor por defecto
            }));
            
            orderDataStorage.getState().setOrderData(ordersData);
          }
        } else {
          const orders = response.userFound.orders;
          const ordersData = orders.map((order: OrderType) => ({
            id: order.id,
            clientEmail: order.clientEmail,
            clientDni: order.clientDni,
            equipmentType: order.equipmentType,
            imei: order.imei,
            assignedTechnician: order.assignedTechnician || "",
            description: order.description,
            status: order.status as "Actualizar" | "Pendiente" | "Iniciado" | "Finalizado",
            user: order.user,
            createdAt: new Date(), // O la fecha correspondiente
            statusHistory: order.statusHistory || [],
            isActive: order.isActive || false, // Asegurarte de que tenga valor por defecto
          }));
          
          orderDataStorage.getState().setOrderData(ordersData);
        }
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError("Error al iniciar sesión");
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-[24px] mb-[120px] justify-center text-white">
      <p className="text-title3">
        ¿Aún no tiene una cuenta?{" "}
        <a href="/register" className="text-title2 text-[#007BFF]">
          Entra aquí
        </a>
      </p>

      {/* Error Message */}
      {error && <p className="mb-6 text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-title1">Nombre de usuario</h3>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border border-transparent focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-title1">Contraseña</h3>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border border-transparent focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoggingIn || !email || !password}
            className={`px-2 py-2 bg-primary-500 mt-4 w-full rounded-[16px] text-white text-bodyBold ${
              !email || !password ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoggingIn ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
