import { RegisterFormType } from "@/interfaces";
const apiUrl = "https://pfback-osdi.onrender.com/";

export const register = async (data: RegisterFormType) => {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${apiUrl}/auth/signin`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
