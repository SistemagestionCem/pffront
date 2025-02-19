interface UserProfileProps {
  nombre: string;
  email: string;
  rol: string;
}

export const UserProfile = ({ nombre, email, rol }: UserProfileProps) => {
  return (
    <div className="mx-auto  sm:px-6 lg:px-8 max-w-3xl">
      <section className="p-4 my-4 w-full max-w-[350px] lg:max-w-[800px] mx-auto text-center text-black bg-white rounded-[16px] shadow-sm">
        <h3 className="py-2 border-b title1 text-primary-500 border-primary-900">
          Datos de Usuario
        </h3>
        <div className="mt-6 flex flex-col lg:flex-row lg:justify-evenly items-center space-y-6 lg:space-y-0">
          <div className="flex items-center gap-4 bodyBold min-w-[200px] lg:justify-center">
            <div className="p-2 bg-primary-500/10 rounded-full">
              <img src="/svg/user.svg" alt="Usuario" className="w-6 h-6" />
            </div>
            <span>{nombre}</span>
          </div>

          <div className="flex items-center gap-4 bodyBold min-w-[200px] lg:justify-center">
            <div className="p-2 bg-primary-500/10 rounded-full">
              <img src="/svg/mail.svg" alt="Mail" className="w-6 h-6" />
            </div>
            <span>{email}</span>
          </div>

          <div className="flex items-center gap-4 bodyBold min-w-[200px] lg:justify-center">
            <div className="p-2 bg-primary-500/10 rounded-full">
              <img src="/svg/rol.svg" alt="rol" className="w-6 h-6" />
            </div>
            <span>{rol}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
