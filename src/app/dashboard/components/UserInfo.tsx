interface UserInfoProps {
    usuario: { nombre: string; email: string; rol: string };
  }
  
  const UserInfo: React.FC<UserInfoProps> = ({ usuario }) => {
    return (
      <section className="p-4 my-4 text-black bg-white rounded-[16px]">
        <h3 className="py-2 border-b title1 text-primary-500 border-primary-900">
          Datos de Usuario
        </h3>
        <div className="mt-4 space-y-4">
          <p className="flex items-center gap-4 bodyBold ">
            <img src="/svg/user.svg" alt="Usuario" className="w-6 h-6" />
            {usuario.nombre}
          </p>
          <p className="flex items-center gap-4 bodyBold">
            <img src="/svg/mail.svg" alt="Mail" className="w-6 h-6" />
            {usuario.email}
          </p>
          <p className="flex items-center gap-4 bodyBold">
            <img src="/svg/rol.svg" alt="rol" className="w-6 h-6" />
            {usuario.rol}
          </p>
        </div>
      </section>
    );
  };
  
  export default UserInfo;