import { useState, useEffect } from "react";
import Image from "next/image";
import { updateUser } from "@/services/usersServices";

interface UserProfileProps {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  dni: string;
  phone: string;
}

export const UserProfile = ({
  id,
  nombre,
  email,
  rol,
  dni,
  phone,
}: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    id: id || "",
    nombre: nombre || "No disponible",
    email: email || "No disponible",
    rol: rol || "No disponible",
    dni: dni || "No disponible",
    phone: phone || "No disponible",
  });

  // Log for debugging
  useEffect(() => {
    console.log("editedData", editedData);
  }, [editedData]);

  // Actualiza el estado cuando los props cambian
  useEffect(() => {
    setEditedData({
      id,
      nombre: nombre || "No disponible",
      email: email || "No disponible",
      rol: rol || "No disponible",
      dni: dni || "No disponible",
      phone: phone || "No disponible",
    });
  }, [id, nombre, email, rol, dni, phone]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const payload = {
      name: editedData.nombre,
      email: editedData.email,
      dni: editedData.dni,
      phone: editedData.phone,
    };
    const response = await updateUser(editedData.id, payload);
    console.log("response", response);
    setIsEditing(false);
  };

  return (
    <div className="mx-auto sm:px-6 lg:px-8 max-w-3xl">
      <section className="p-4 my-4 w-full max-w-[350px] lg:max-w-[800px] mx-auto text-center text-black bg-white rounded-[16px] shadow-sm">
        <h3 className="py-2 border-b title1 text-primary-500 border-primary-900">
          Datos de Usuario
        </h3>
        <div className="mt-6 flex flex-col lg:flex-row lg:flex-wrap lg:justify-evenly items-center space-y-6 lg:space-y-0 lg:gap-y-6">
          {/* Nombre */}
          <div className="flex items-center gap-4 bodyBold min-w-[200px] lg:justify-center">
            <div className="p-2 bg-primary-500/10 rounded-full">
              <Image
                src="/svg/user.svg"
                alt="Usuario"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            {isEditing ? (
              <input
                title="Nombre"
                type="text"
                name="nombre"
                value={editedData.nombre}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <span>{editedData.nombre}</span> 
            )}
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 bodyBold min-w-[200px] lg:justify-center">
            <div className="p-2 bg-primary-500/10 rounded-full">
              <Image
                src="/svg/mail.svg"
                alt="Mail"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            {isEditing ? (
              <input
                title="Email"
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <span>{editedData.email}</span> 
            )}
          </div>

          {/* Rol */}
          <div className="flex items-center gap-4 bodyBold min-w-[200px] lg:justify-center">
            <div className="p-2 bg-primary-500/10 rounded-full">
              <Image
                src="/svg/rol.svg"
                alt="rol"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <span>{editedData.rol}</span>
          </div>

          {/* DNI */}
          <div className="flex items-center gap-4 bodyBold min-w-[200px] lg:justify-center">
            <div className="p-2 bg-primary-500/10 rounded-full">
              <Image
                src="/svg/dni.svg"
                alt="DNI"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            {isEditing ? (
              <input
                title="DNI"
                type="text"
                name="dni"
                value={editedData.dni}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <span>{editedData.dni}</span> 
            )}
          </div>

          {/* Teléfono */}
          <div className="flex items-center gap-4 bodyBold min-w-[200px] lg:justify-center">
            <div className="p-2 bg-primary-500/10 rounded-full">
              <Image
                src="/svg/mobil.svg"
                alt="Teléfono"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            {isEditing ? (
              <input
                title="Teléfono"
                type="text"
                name="phone"
                value={editedData.phone}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <span>{editedData.phone}</span> 
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>

          {isEditing && (
            <button
              onClick={handleSave}
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Guardar
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
