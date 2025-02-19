import { useState, useEffect } from "react";
import { getAllUserService } from "@/services/usersServices";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersListProps {
  onRoleChange: (userId: string, newRole: string) => void;
}

const UsersList = ({ onRoleChange }: UsersListProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUserService();
      if (data) {
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="mt-4">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Nombre</th>
            <th className="pb-2">Email</th>
            <th className="pb-2">Rol</th>
            <th className="pb-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <select
                  className="p-1 border rounded"
                  value={user.role}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                >
                  <option value="CLIENT">Cliente</option>
                  <option value="TECHN">Técnico</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
