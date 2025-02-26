import { changeRole, getAllUserService } from "@/services/usersServices";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

// Define interfaces para los usuarios y el rol
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

type Role = "CLIENT" | "ADMIN" | "TECHN";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>("CLIENT");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUserService();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.log(error);
        setError("Hubo un error al cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value)
      )
    );
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setRole(user.role || "CLIENT"); // Asigna el rol actual o "CLIENT" por defecto
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  // Agregar nuevo estado al inicio del componente
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Modificar la función handleSave
  const handleSave = async () => {
    if (!selectedUser || !role) return;

    try {
      await changeRole({ role, id: selectedUser.id });
      const updatedUsers = await getAllUserService();
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);

      setIsSuccess(true);
      setConfirmationMessage("Rol actualizado correctamente");
      setShowConfirmation(true);
      closeModal();
      window.location.reload();

      // Auto cerrar el mensaje después de 2 segundos
      setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    } catch (error) {
      setIsSuccess(false);
      setConfirmationMessage("Error al actualizar el rol");
      setShowConfirmation(true);
      console.error(error);
    }
  };

  // Agregar el modal de confirmación al final del return, justo antes del último </div>

  // Actualizar el useEffect para que se ejecute cuando cambie el rol
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUserService();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.log(error);
        setError("Hubo un error al cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); // Mantener las dependencias vacías ya que fetchUsers se llamará manualmente

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2 sm:p-4 bg-white rounded-xl text-black mt-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Lista de usuarios
      </h2>
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={search}
        onChange={handleSearch}
        className="w-full p-2 text-sm border border-gray-300 rounded-lg"
      />
      <div className="relative overflow-x-auto mt-4">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-xs sm:text-sm bg-gray-50">
              <th className="text-center p-2 sm:p-3 font-semibold text-gray-600 w-[25%]">
                Nombre
              </th>
              <th className="text-center p-2 sm:p-3 font-semibold text-gray-600 w-[45%]">
                Email
              </th>
              <th className="text-center p-2 sm:p-3 font-semibold text-gray-600 w-[30%]">
                Rol
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
          {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="text-center text-xs sm:text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openModal(user)}
              >
                <td className="p-2 sm:p-3">
                  <span className="block truncate text-gray-900 font-medium">
                    {user.name}
                  </span>
                </td>
                <td className="p-2 sm:p-3">
                  <span className="block truncate text-gray-600">
                    {user.email}
                  </span>
                </td>
                <td className="p-2 sm:p-3">
                  <span
                    className={`inline-block text-center w-20 px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "TECHN"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Editar Usuario
              </h2>
              <button
                title="Cerrar"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Nombre:
                </label>
                <p className="mt-1 text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Email:
                </label>
                <p className="mt-1 text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Rol:
                </label>
                <select
                  title="Rol"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="mt-1 w-full p-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="CLIENT">Cliente</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="TECHN">Técnico</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-bodyBold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-bodyBold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de usuario */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Editar Usuario
              </h2>
              <button
                type="button"
                title="Cerrar"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Nombre:
                </label>
                <p className="mt-1 text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Email:
                </label>
                <p className="mt-1 text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-bodyBold font-bold text-gray-700">
                  Rol:
                </label>
                <select
                  title="Rol"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="mt-1 w-full p-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="CLIENT">Cliente</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="TECHN">Técnico</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-bodyBold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-bodyBold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-[60]">
          <div
            className={`${
              isSuccess ? "bg-green-50" : "bg-red-50"
            } p-4 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out max-w-sm mx-4 border ${
              isSuccess ? "border-green-200" : "border-red-200"
            }`}
          >
            <div className="text-center">
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isSuccess ? "text-green-800" : "text-red-800"
                }`}
              >
                {isSuccess ? "¡Éxito!" : "Error"}
              </h3>
              <p className={`${isSuccess ? "text-green-600" : "text-red-600"}`}>
                {confirmationMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
