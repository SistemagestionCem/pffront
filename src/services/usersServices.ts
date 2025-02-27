const apiUrl = "https://pfback-osdi.onrender.com/";
// const apiUrl = "http://localhost:3000/";


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

export const changeRole = async ({ role, id }: { role: string; id: string }) => {
  const response = await fetch(`${apiUrl}users/changeRole/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }), // Envía el rol en el body
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al cambiar el rol");
  }

  return response.json();
};

