import { PostOrderType } from "@/interfaces";
import { toast } from "sonner";
const apiUrl = "https://pfback-osdi.onrender.com/";
// const apiUrl = "http://localhost:3000/";

export const postOrderService = async (data: PostOrderType) => {
  
  try {
    console.log("Datos enviados al backend:", data);
    const response = await fetch(`${apiUrl}orders/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta recibida de la API:", response); // Muestra toda la respuesta HTTP

    let responseData;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text(); // Leer como texto si no es JSON
    }
    console.log("Mensaje de error del backend:", responseData);
    if (!response.ok) {
      toast.error(`Error: ${responseData}`);
      throw new Error(responseData); // Lanzar error para capturarlo en el catch
    }
    console.log("Orden creada:", responseData); // ← Aquí ves la respuesta en consola

    return responseData;
  } catch (error) {
    throw new Error("Error en postOrderService", { cause: error });
  }
};

export const getOrderByEmail = async (email: string) => {
  try {
    const response = await fetch(`${apiUrl}orders/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
 
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al cargar el usuarios");
    }
    return response.json();
  } catch (error) {
    console.log("error al obtener los usuarios", error);
    return null;
  }
};

export const getTechOrders = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}orders/technician/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    return response.json();
  } catch (error) {
    console.log(error);
    return null
  }
}

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    const response = await fetch(`${apiUrl}orders/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al cargar el usuarios");
    }
    return response.json();
  } catch (error) {
    console.log("error al obtener los usuarios", error);
    return null;
  }
};

export const updateOrderDescription = async (id: string, description: string) => {
  try {
    const response = await fetch(`${apiUrl}orders/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description }),
    });
   
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al cargar el usuarios");
    }
    return response.json();
  } catch (error) {
    console.log("error al obtener los usuarios", error);
    return null;    
  }  
};

export const getAllOrders = async () => {
  try {
    const response = await fetch(`${apiUrl}orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al cargar el usuarios");
    }
    return response.json();
  } catch (error) {
    console.log("error al obtener los usuarios", error);
    return null;
  }
};
