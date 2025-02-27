/* eslint-disable @typescript-eslint/no-explicit-any */
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
    dni: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
    dni: false,
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{9}$/;
  const dniRegex = /^[0-9]{8}$/;

  const validateField = (name: string, value: string | number) => {
    switch (name) {
      case "name":
        return value.toString().length >= 3;
      case "email":
        return emailRegex.test(value.toString());
      case "password":
        return value.toString().length >= 10;
      case "phone":
        return phoneRegex.test(value.toString());
      case "dni":
        return dniRegex.test(value.toString());
      default:
        return true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    // Add validation for DNI to accept only numbers
    if (name === "dni" && !/^\d*$/.test(value)) {
      return;
    }

    const newValue = type === "number" ? Number(value) || 0 : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: value.length > 0 && !validateField(name, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast.error("Debes aceptar los términos y condiciones", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
      return;
    }

    // Validate all fields
    const hasErrors = Object.keys(formData).some(
      (key) => !validateField(key, formData[key as keyof RegisterFormType])
    );

    if (hasErrors) {
      toast.error("Por favor, corrija los errores en el formulario", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await register(formData);
      console.log("Response:", response);

      // Handle successful registration
      if (response.status === 201 || response.status === 200) {
        toast.success("¡Registro exitoso!", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        router.push("/login");
        return;
      }

      // Handle known error responses
      if (response.statusCode >= 400) {
        const errorMessage = Array.isArray(response.message)
          ? response.message[0]
          : response.message || "Error al registrar";

        toast.error(errorMessage, {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        return;
      }
    } catch (err: any) {
      console.log("Error:", err);

      if (err.response?.data) {
        const errorData = err.response.data;
        const errorMessage = Array.isArray(errorData.message)
          ? errorData.message[0]
          : errorData.message;

        toast.error(errorMessage, {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
      } else {
        // Handle unexpected errors
        toast.error("Error al registrar. Por favor, intente nuevamente", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-[24px] mb-[72px] justify-center text-white">
      <p className="text-title3">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-title2 text-[#007BFF]">
          Inicia sesión aquí
        </a>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-3">
          <h3 className="text-title1">Nombre completo</h3>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingresa tu nombre"
            value={formData.name}
            onChange={handleChange}
            className={`w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border ${
              formErrors.name ? "border-primary-500" : "border-transparent"
            } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200`}
          />
          {formErrors.name && (
            <p className="text-primary-500 text-sm">
              El nombre debe tener al menos 3 caracteres
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-3">
          <h3 className="text-title1">Correo electrónico</h3>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border ${
              formErrors.email ? "border-primary-500" : "border-transparent"
            } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200`}
          />
          {formErrors.email && (
            <p className="text-primary-500 text-sm">
              Ingresa un correo electrónico válido
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div className="space-y-3">
          <h3 className="text-title1">Teléfono</h3>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Ingresa tu teléfono"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border ${
              formErrors.phone ? "border-primary-500" : "border-transparent"
            } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200`}
          />
          {formErrors.phone && (
            <p className="text-primary-500 text-sm">
              El teléfono debe tener 9 dígitos
            </p>
          )}
        </div>

        {/* DNI Input */}
        <div className="space-y-3">
          <h3 className="text-title1">DNI</h3>
          <input
            type="text"
            id="dni"
            name="dni"
            placeholder="Ingresa tu DNI"
            value={formData.dni}
            onChange={handleChange}
            maxLength={8}
            className={`w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border ${
              formErrors.dni ? "border-primary-500" : "border-transparent"
            } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200`}
          />
          {formErrors.dni && (
            <p className="text-primary-500 text-sm">
              El DNI debe tener 8 dígitos
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-3">
          <h3 className="text-title1">Contraseña</h3>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleChange}
            className={`w-full py-[6px] px-[16px] text-lg rounded-[8px] text-black outline-none border ${
              formErrors.password ? "border-primary-500" : "border-transparent"
            } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200`}
          />
          {formErrors.password && (
            <p className="text-primary-500 text-sm">
              La contraseña debe tener al menos 10 caracteres
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !acceptTerms ||
              Object.values(formErrors).some(Boolean)
            }
            className={`px-2 py-2 bg-primary-500 mt-4 w-full rounded-[16px] text-white text-bodyBold flex items-center justify-center gap-2 ${
              !acceptTerms || Object.values(formErrors).some(Boolean)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitting && (
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
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
