"use client";
<<<<<<< Updated upstream
import { useState } from "react";
import { useRouter } from "next/navigation";
import userDataStorage from "@/storage/userStore";
=======

import { useState } from "react";
import { useRouter } from "next/navigation";
import userDataStorage from "@/storage/userStore";
import { getOrderByEmail } from "@/services/orderService";
>>>>>>> Stashed changes
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

  // Remove this unused state
  // const [error, setError] = useState("");

  // Expresión regular para validar un correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handler para el submit
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (email: string) => {
    const isValid = emailRegex.test(email);
    setEmailError(!isValid && email.length > 0);
    return isValid;
  };

  const validatePassword = (password: string) => {
    const isValid = password.length >= 10;
    setPasswordError(!isValid && password.length > 0);
    return isValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password)) {
      toast.error("Por favor, corrija los errores en el formulario", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
      return;
    }

    // setError("");

    // Validaciones
    if (!email || !password) {
      // Error notifications
      toast.error("Ambos campos son requeridos!", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });

      // Warning/Info notifications
      toast.warning("Por favor ingrese un email válido", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });

      // Success notifications
      toast.success("Inicio de sesión exitoso", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast.warning("Por favor ingrese un email válido", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await login(email, password);
      if (response) {
        setUserData({
          id: response.userFound.id,
          name: response.userFound.name,
          email: response.userFound.email,
          role: response.userFound.role,
<<<<<<< Updated upstream
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
=======
        });

        try {
          const orders = await getOrderByEmail(response.userFound.email);
          if (orders) {
            orderDataStorage.getState().setOrderData(orders);
          }
        } catch (orderError) {
          console.error("Error fetching orders:", orderError);
          toast.error("Error al cargar las órdenes", {
            duration: 3000,
            position: "top-center",
            richColors: true,
          });
        }

        toast.success("Inicio de sesión exitoso", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
>>>>>>> Stashed changes
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setIsLoggingIn(false);
      setPassword("");
      toast.error("Usuario o contraseña incorrectos", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
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

      {/* Remove these lines */}
      {/* {error && <p className="mb-6 text-center text-red-500">{error}</p>} */}
      {/* {error && (
        <p className="p-3 mb-6 text-sm text-center text-white rounded-lg bg-red-500/80">
          {error}
        </p>
      )} */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-title1">Nombre de usuario</h3>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            className={`w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border ${
              emailError ? "border-primary-500" : "border-transparent"
            } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200`}
          />
          {emailError && (
            <p className="text-primary-500 text-sm">
              Por favor ingrese un correo electrónico válido
            </p>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-title1">Contraseña</h3>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border ${
              passwordError ? "border-primary-500" : "border-transparent"
            } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200`}
          />
          {passwordError && (
            <p className="text-primary-500 text-sm">
              La contraseña debe tener al menos 10 caracteres
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={
              isLoggingIn || !email || !password || emailError || passwordError
            }
            className={`px-2 py-2 bg-primary-500 mt-4 w-full rounded-[16px] text-white text-bodyBold flex items-center justify-center gap-2 ${
              !email || !password || emailError || passwordError
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoggingIn && (
              <div className="animate-spin w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            )}
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
