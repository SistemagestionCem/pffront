import { PostOrderType } from "@/interfaces";
import { toast } from "sonner";
const apiUrl = "https://pfback-osdi.onrender.com/";

export const postOrderService = async (data: PostOrderType) => {
  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast("Error obteniendo órdenes");
      return await response.json();
    }
    return await response.json();
  } catch (error: any) {
    console.log("error en postOrderService", error.message);
    throw new Error(error.message);
  }
};
