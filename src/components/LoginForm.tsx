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
        position: "top-center",
        richColors: true,
      });
      return;
    }

    if (!email || !password) {
      toast.error("Ambos campos son requeridos!", {
        position: "top-center",
        richColors: true,
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await login(email, password);
      if (response) {
        // Guardar datos del usuario
        setUserData({
          id: response.userFound.id,
          name: response.userFound.name,
          email: response.userFound.email,
          role: response.userFound.role,
        });

        // Obtener órdenes según el rol
        let orders;
        if (response.userFound.role === "CLIENT") {
          orders = await getOrderByEmail(response.userFound.email);
        } else if (response.userFound.role === "TECHN") {
          orders = await getTechOrders(response.userFound.id);
        } else {
          orders = response.userFound.orders;
        }

        // Procesar órdenes si existen
        if (orders) {
          const ordersData = orders.map((order: OrderType) => ({
            id: order.id,
            clientEmail: order.clientEmail,
            clientDni: order.clientDni,
            equipmentType: order.equipmentType,
            imei: order.imei,
            assignedTechnician: order.assignedTechnician || "",
            description: order.description,
            status: order.status,
            user: order.user,
            createdAt: order.createdAt || new Date(),
            statusHistory: order.statusHistory || [],
            isActive: order.isActive || false,
          }));

          orderDataStorage.getState().setOrderData(ordersData);
        }

        toast.success(`Bienvenido ${response.userFound.name}!`, {
          position: "top-center",
          richColors: true,
        });
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setIsLoggingIn(false);
      setPassword("");
      toast.error("Usuario o contraseña incorrectos", {
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
