import { PostOrderType } from "@/interfaces";
import { toast } from "sonner";
const apiUrl = "https://pfback-osdi.onrender.com/";

export const postOrderService = async (data: PostOrderType) => {
  try {
    const response = await fetch(`${apiUrl}orders/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers]);

    let responseData;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text(); // Leer como texto si no es JSON
    }
    if (!response.ok) {
      toast.error(`Error: ${responseData}`);
      throw new Error(responseData); // Lanzar error para capturarlo en el catch
    }

    return responseData;
  } catch (error: any) {
    console.error("Error en postOrderService:", error.message);
    throw new Error(error.message);
  }
};
//     if (!response.ok) {
//       const errorMessage = await response.text();
//       toast.error(`Error: ${errorMessage}`);
//       return await response.json();
//     }
//   } catch (error: any) {
//     console.log("error en postOrderService", error.message);
//     throw new Error(error.message);
//   }
// };

// export const getAllOrderService = async (token: string) => {};
// try{ const response = await fetch(`${apiUrl}/orders`, {

// }
// getAllOrders
