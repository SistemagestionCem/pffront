import { useEffect, useState } from "react";
import { getAllUserService } from "@/services/usersServices";
import { UserType } from "@/interfaces";

const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUserService();
      if (data) setUsers(data);
    };
    fetchUsers();
  }, []);

  return {
    tecnicos: users.filter((user) => user.role === "TECHN"),
    clientes: users.filter((user) => user.role === "CLIENT"),
    admin: users.filter((user) => user.role === "ADMIN"),
  };
};

export default useUsers;
