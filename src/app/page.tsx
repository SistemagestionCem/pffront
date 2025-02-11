/* eslint-disable @next/next/no-img-element */

export default function Home() {
  const services = [
    {
      title: "Pantallas Rotas",
      description:
        "Servicio de reparación de pantallas dañadas para todo tipo de dispositivos, incluyendo celulares, tablets y laptops. Arreglamos grietas, píxeles muertos y problemas de visualización con repuestos de alta calidad.",
      img: "/servicio-repacion.png",
    },
    {
      title: "Baterias Defectuosas",
      description:
        "Reemplazo y reparación de baterías que se descargan rápido, no cargan o causan sobrecalentamiento. Usamos repuestos de calidad para maximizar la vida útil de tu dispositivo. ",
      img: "/baterias.jpg",
    },
    {
      title: "Problemas de Software",
      description:
        "Solución de fallos en el sistema, reinicios inesperados, errores de actualización y optimización del rendimiento. Recuperamos datos y reinstalamos software para que tu equipo funcione como nuevo. ",
      img: "/softwares.jpeg",
    },
  ];

  const chooseUs = [
    {
      title: "Tecnicos certificados",
    },
    {
      title: "Garantía de 6 meses",
    },
    {
      title: "Repuestos originales",
    },
    {
      title: "Servicio rápido",
    },
  ];

  return (
    <div className="container mx-auto flex flex-col items-center px-[5vw] mt-[72px] gap-[24px]">
      <div className="">
        <img
          alt=""
          src="https://www.rollingstone.com/wp-content/uploads/2024/09/iphone-16-pro-featured-image.png?w=1581&h=1054&crop=1"
        />
      </div>
      <section className="container flex flex-col items-center pb-16 mx-auto bg-primary-500 bg-opacity-20 rounded-[16px]">
        <div className="pt-16 font-bold text-center text-white text-display3 sm:text-3xl md:text-4xl">
          <h1 className="pb-4">
            Recupera tu dispositivo con nuestro servicio rápido y garantizado!
          </h1>
        </div>
        <form className="w-full text-center max-w-[776px]">
          <input
            type="text"
            placeholder="Rastrea tu orden"
            className="py-2 w-full text-center rounded-[8px]"
          />
          <button className="px-2 py-2 bg-primary-500 mt-4 w-full rounded-[16px] text-white text-bodyBold text-xl">
            Buscar
          </button>
        </form>
      </section>
      <div className="space-y-4 ">
        <div className="pt-16 border-t border-white border-opacity-20">
          <h1 className="text-4xl font-bold text-center text-white text-display3 sm:text-4xl md:text-5xl">
            Nuestros Servicios
          </h1>
          <div className="grid gap-[16px] lg:grid-cols-3 pt-8">
            {services.map((service, index) => {
              return (
                <div
                  key={index}
                  className="text-white p-6 border border-white rounded-lg max-w-[420px] bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-colors duration-300"
                >
                  <div className="mb-4 text-3xl font-semibold text-white text-title2">
                    {service.title}
                  </div>
                  <div className="text-white ">{service.description}</div>
                  <div className="w-full h-48 overflow-hidden rounded-[16px]">
                    <img
                      className="object-cover w-full h-full"
                      src={service.img}
                      alt="servicio de repacion"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 my-4">
          <div className="py-16 border-t border-white border-opacity-20">
            <h3 className="text-4xl text-center text-white text-display3 sm:text-4xl md:text-5xl">
              ¿Por que Elegirnos?
            </h3>
            <div className="gap-6 p-4 pt-4 space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
              {chooseUs.map((service, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center p-4 transition-colors duration-300 bg-white rounded-lg lg:justify-center bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20"
                  >
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-4"
                    >
                      <rect width="31" height="31" rx="15.5" fill="#E10600" />
                    </svg>
                    <div className="text-lg text-white text-bodyBold">
                      {service.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center pb-20 mb-8">
            <img
              src="/celular-reparacion.png"
              alt="celular reparado"
              width="100%"
              className="max-w-lg rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
