"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { register } from "@/services/authServices";
import { RegisterFormType } from "@/interfaces";

const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormType>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

  const navigateToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-md border border-gray-100">
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingresa tu nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-black text-white text-lg py-3 px-8 rounded-xl hover:bg-gray-800 transition duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={navigateToLogin}
          className="text-black font-semibold hover:underline"
        >
          Ya tienes una cuenta? Ingresa
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
