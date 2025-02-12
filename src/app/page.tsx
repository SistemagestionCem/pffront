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
    <div className="container mx-auto flex flex-col items-center px-[5vw] mt-20 gap-8">
      <div className="w-full max-w-6xl">
        <img
          alt="reparacion de celulares"
          src="https://www.rollingstone.com/wp-content/uploads/2024/09/iphone-16-pro-featured-image.png?w=1581&h=1054&crop=1"
          className="w-full rounded-2xl"
        />
      </div>
      <section className="container flex flex-col items-center py-8 px-6 mb-8 sm:px-8 mx-auto bg-primary-500/20 rounded-[16px] w-full max-w-6xl">
        <div className="max-w-4xl">
          <h1 className="pb-8 text-center text-white text-display3 lg:display1 ">
            Recupera tu dispositivo con nuestro servicio rápido y garantizado!
          </h1>
        </div>
        <form className="w-full text-center max-w-2xl">
          <input
            type="text"
            placeholder="Rastrea tu orden"
            className="py-2 px-4 w-full text-center bg-white/90 rounded-[8px] placeholder-gray-500"
          />
          <button className="px-6 py-2 bg-primary-500 mt-4 w-full rounded-[16px] text-white text-title2 hover:bg-primary-600 transition-colors">
            Buscar
          </button>
        </form>
      </section>
      <section className="space-y-6 w-full max-w-6xl">
        <div className="py-8 border-t border-white-20">
          <h1 className="text-display3 text-center text-white mt-4">
            Nuestros Servicios
          </h1>
          <div className="grid gap-8 lg:grid-cols-3 pt-8">
            {services.map((service, index) => {
              return (
                <div
                  key={index}
                  className="text-white mx-4 p-4 border border-white/50 rounded-[16px] bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                >
                  <h3 className="mb-4 text-title1 text-white lg:text-title2">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-subtitle2 mb-4 leading-relaxed ">{service.description}</p>
                  <div className="w-full h-48 overflow-hidden rounded-[16px]">
                    <img
                      className="object-cover w-full h-56 overflow-hidden rounded-[16px]"
                      src={service.img}
                      alt={service.title}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 my-4">
          <div className="py-8 border-t border-white border-opacity-20">
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
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center mr-4 text-white font-bold">
                    {index + 1}
                    </div>
                    <div className="text-lg text-white text-bodyBold">
                      {service.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center pb-6 mb-6">
            <img
              src="/celular-reparacion.png"
              alt="celular reparado"
              width="100%"
              className="max-w-lg rounded-[16px] shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
