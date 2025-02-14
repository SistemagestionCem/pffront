import { error } from "console";

const apiUrl = "https://pfback-osdi.onrender.com/";
console.log("Fetching from:", apiUrl);

export const getAllUserService = async () => {
  try {
    const response = await fetch(`${apiUrl}users/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Raw response:", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cargar los usuarios");
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    return response.json();
  } catch (error: any) {
    console.log("error al obtener los usuarios", error.message);
  }
};
