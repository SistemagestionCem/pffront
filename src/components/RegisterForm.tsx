"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { register } from "@/services/authServices";
import { RegisterFormType } from "@/interfaces";

const RegisterForm = () => {
  // const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormType>({
    name: "",
    email: "",
    password: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false); // Add this state

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      return setError("Debes aceptar los términos y condiciones");
    }

    // Validación de los campos
    if (!formData.name || !formData.email || !formData.password) {
      return setError("All fields are required.");
    }

    if (!emailRegex.test(formData.email)) {
      return setError("Please enter a valid email address.");
    }

    setError("");
    setIsSubmitting(true);

    // try {
    //   // Llamar a la función de registro
    //   const response = await register(formData);

    //   if (response) {
    //     alert("Registration successful!");
    //     router.push("/login");
    //   }

    // } catch (err) {
    //   return setError("Failed to register. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

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
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] focus:outline-none focus:ring-2 focus:ring-black text-black"
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
            value={formData.password}
            onChange={handleChange}
            className="w-full py-[6px] px-[16px] text-lg rounded-[8px] focus:outline-none focus:ring-2 focus:ring-black text-black"
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
