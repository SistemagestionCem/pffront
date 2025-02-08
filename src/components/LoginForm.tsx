// components/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { login } from "@/services/authServices";
import userDataStorage from "@/storage/userStore";


const LoginForm = () => {
  const router = useRouter();
  const { setUserData } = userDataStorage();
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);

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

    if(email === "admin@admin.com" && password === "admin") {
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
  const navigateToRegister = () => {
    router.push("/register"); 
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-md border border-gray-100">

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}


      <form onSubmit={handleSubmit}>

        <div className="mb-6">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className={`w-full bg-black text-white text-lg py-3 px-8 rounded-xl hover:bg-gary-800 transition duration-300 ${(isLoggingIn ? "opacity-50 cursor-not-allowed": "")}`}
        >
          {isLoggingIn ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={navigateToRegister}
          className="text-black font-semibold hover:underline"
        >
          No tienes una cuenta? Registrate
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
