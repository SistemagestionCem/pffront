import { RegisterFormType } from "@/interfaces";
const apiUrl = "https://pfback-osdi.onrender.com"

export const register = async (data: RegisterFormType) => {
    try {
        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convertir a JSON
        });

        const result = await response.json();
        console.log(result); // Usar el resultado real

        return result;
    } catch (error) {
        console.log("Error en el registro:", error);
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${apiUrl}/auth/signin`, {
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }
};