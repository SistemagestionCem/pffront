"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormType } from "@/interfaces";
import { toast } from "sonner";
import { register } from "@/services/auth";

const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormType>({
    name: "",
    email: "",
    password: "",
    phone: "",
    dni: "" as any,
  });
  const [acceptTerms, setAcceptTerms] = useState(false); // Add this state

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      return toast.error("Debes aceptar los términos y condiciones");
    }

    // Validación de los campos
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Todos los campos son requeridos.");
    }

    if (!emailRegex.test(formData.email)) {
      return toast.error("Por favor ingresa un email válido");
    }

    setError("");
    setIsSubmitting(true);
    
    try {
      console.log(formData);
      
      // Llamar a la función de registro
      const response = await register(formData);
      console.log(response);
      

      if (response) {
        alert("Registration successful!");
        router.push("/login");
      }

    } catch (err) {
      return setError("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }

    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) || "" : value, // Convierte a número si es un input number
    }));
  };

  // const navigateToLogin = () => {
  //   router.push("/login");
  // };

  return (
    <div className="flex flex-col gap-[24px] mb-[72px] justify-center">
      <p className="text-title3">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-title2 text-[#007BFF]">
          Inicia sesión aquí
        </a>
      </p>
      {error && <p className="mb-6 text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-title1">Nombre completo</h3>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingresa tu nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border border-transparent focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-title1">Correo electrónico</h3>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border border-transparent focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-title1">Telefono</h3>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Ingresa tu telefono "
            value={formData.phone}
            onChange={handleChange}
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border border-transparent focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
          />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-title1">Dni</h3>
          <input
            type="number"
            id="dni"
            name="dni"
            placeholder="Ingresa tu Dni "
            value={formData.dni}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border border-transparent focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 text-primary-500"
          />
          <label htmlFor="terms" className="text-white text-subtitle2">
            Acepto los{" "}
            <a href="/terms" className="text-[#007BFF] hover:underline">
              términos y condiciones
            </a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || !acceptTerms}
            className={`px-2 py-2 bg-primary-500 mt-4 w-full rounded-[16px] text-white text-bodyBold ${
              !acceptTerms ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
