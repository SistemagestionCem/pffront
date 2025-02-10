// components/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { login } from "@/services/authServices";
import userDataStorage from "@/storage/userStore";

const LoginForm = () => {
  const router = useRouter();
  const { setUserData } = userDataStorage();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  console.log(setUserData);

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

    // Validación simple
    if (!email || !password) {
      setError("Ambos campos son requeridos!");
      return;
    }

    // Validación de correo electrónico
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un email valido");
      return;
    }

    setIsLoggingIn(true);

    if (email === "admin@admin.com" && password === "admin") {
      // setUserData({ email, password });
      router.push("/dashboard");
      return;
    }

    // try {
    //   const response = await login({ email, password });

    //   if (response) {
    //     setUserData(response)
    //     router.push("/home");
    //   }
    // } catch (error) {
    //   return setError("Error logging in. Please try again.");
    // } finally {
    //   setIsLoggingIn(false);
    // }

    setError("");
  };

  // Función para navegar al registro
  // const navigateToRegister = () => {
  //   router.push("/register");
  // };

  return (
    <div className="flex flex-col gap-[24px] mb-[120px] justify-center text-white">
      <p className="text-title3">
        ¿Aún no tiene una cuenta?{" "}
        <a href="/register" className="text-title2 text-[#007BFF]">
          Entra aquí
        </a>
      </p>
      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

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
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] focus:outline-none focus:ring-2 focus:ring-black text-black"
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
            className="w-full py-[6px] px-[16px] text-lg  rounded-[8px] focus:outline-none focus:ring-2 focus:ring-black text-black"
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

      {/* <div className="mt-6 text-center">
        <button onClick={navigateToRegister} className="text-black font-semibold hover:underline">
          No tienes una cuenta? Registrate
        </button>
      </div> */}
    </div>
  );
};

export default LoginForm;
