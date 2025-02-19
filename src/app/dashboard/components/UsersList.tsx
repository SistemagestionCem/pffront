import { changeRole, getAllUserService } from "@/services/usersServices";
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
        console.log(error)
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

  const handleSave = async () => {
    if (!selectedUser || !role) return;

    try {
      await changeRole({ role, id: selectedUser.id });
      alert("Rol actualizado correctamente");
      closeModal();

      // Actualizar la lista de usuarios después del cambio de rol
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role } : user
        )
      );
    } catch (error) {
      alert("Error al actualizar el rol");
      console.error(error);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-white rounded-xl text-black mt-4">
      <h2 className="text-xl font-bold mb-4">Lista de usuarios</h2>
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={search}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse ">
          <thead>
            <tr className="">
              <th className=" p-2">Nombre</th>
              <th className=" p-2">Email</th>
              <th className=" p-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => openModal(user)}
              >
                <td className=" p-2">{user.name}</td>
                <td className=" p-2">{user.email}</td>
                <td className=" p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <p><strong>Nombre:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <label className="block mt-4">
              <span className="font-semibold">Rol:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="CLIENT">Cliente</option>
                <option value="ADMIN">Administrador</option>
                <option value="TECHN">Técnico</option>
              </select>
            </label>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
