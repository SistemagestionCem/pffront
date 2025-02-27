import { toast } from "sonner";
const apiUrl = "https://pfback-osdi.onrender.com/";
// const apiUrl = "http://localhost:3000/";

export const postEvidenceService = async (orderId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append("orderId", orderId); // Agrega el ID de la orden
      formData.append("image", file); // Agrega el archivo binario
  
      const response = await fetch(`${apiUrl}evidences`, {
        method: "POST",
        body: formData, // Enviar FormData en lugar de JSON
      });
  
      let responseData;
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      console.log("Respuesta del backend:", responseData);

      if (!response.ok) {
        toast.error(`Error: ${responseData}`);
        throw new Error(responseData); 
      }
  
      return responseData;
    } catch (error) {
      console.error("Error en postEvidenceService:", error);
      throw new Error("Error en postEvidenceService", { cause: error });
    }
  };
  