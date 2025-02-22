import Image from "next/image";

interface UserProfileProps {
  nombre: string;
  email: string;
  rol: string;
  dni: number;
  phone: string;
}

export const UserProfile = ({
  nombre,
  email,
  rol,
  dni,
  phone,
}: UserProfileProps) => {
  return (
    <div className="mx-auto sm:px-6 lg:px-8 max-w-3xl">
      <section className="p-4 my-4 w-full max-w-[350px] lg:max-w-[800px] mx-auto text-center text-black bg-white rounded-[16px] shadow-sm">
        <h3 className="py-2 border-b title1 text-primary-500 border-primary-900">
          Datos de Usuario
        </h3>
        <div className="mt-6 flex flex-col lg:flex-row lg:flex-wrap lg:justify-evenly items-center space-y-6 lg:space-y-0 lg:gap-y-6">
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
            <span>{nombre}</span>
          </div>

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
            <span>{email}</span>
          </div>

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
            <span>{rol}</span>
          </div>

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
            <span>{dni}</span>
          </div>

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
            <span>{phone}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
