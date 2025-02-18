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
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cargar los usuarios");
    }
    return response.json();
  } catch (error) {
    console.log("error al obtener los usuarios", error);
  }
};
