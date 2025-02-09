/* eslint-disable @next/next/no-img-element */
import Footer from "../components/footer";

export default function Home() {
  const services = [
    {
      title: "Pantallas Rotas",
      description:
        "Servicio de reparación de pantallas dañadas para todo tipo de dispositivos, incluyendo celulares, tablets y laptops. Arreglamos grietas, píxeles muertos y problemas de visualización con repuestos de alta calidad.",
    },
    {
      title: "Baterias Defectuosas",
      description:
        "Reemplazo y reparación de baterías que se descargan rápido, no cargan o causan sobrecalentamiento. Usamos repuestos de calidad para maximizar la vida útil de tu dispositivo. ",
    },
    {
      title: "Problemas de Software",
      description:
        "Solución de fallos en el sistema, reinicios inesperados, errores de actualización y optimización del rendimiento. Recuperamos datos y reinstalamos software para que tu equipo funcione como nuevo. ",
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
      <div className="text-white text-display3 text-center font-bold">
        <h1>Recupera tu dispositivo con nuestro servicio rápido y garantizado!</h1>
      </div>
      <div className="w-full text-center">
        <input
          type="text"
          placeholder="Rastrea tu orden"
          className="py-2 w-full text-center rounded-[8px]"
        />
        <button className="px-2 py-2 bg-primary-500 mt-4 w-full rounded-[16px] text-white text-bodyBold">
          Buscar
        </button>
      </div>

      <div className="space-y-4">
        <h1 className=" text-white text-display3 text-center font-bold">Nuestros Servicios</h1>
        <div className="grid gap-[16px] lg:grid-cols-3">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="text-white p-4 border space-y-4 border-white rounded-[16px] max-w-[420px]"
              >
                <div className="text-title2 text-white">{service.title}</div>
                <div className="text-white">{service.description}</div>
                <div>
                  <img src="/servicio-repacion.png" alt="servicio de repacion" width="100%" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-4">
        <h3 className="text-display3 text-white text-center">¿Por que Elegirnos?</h3>
        <div className="md:grid md:grid-cols-4 space-y-4 p-4">
          {chooseUs.map((service, index) => {
            return (
              <div key={index} className="flex items-center">
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
                <p className="text-white text-lg">{service.title}</p>
              </div>
            );
          })}
        </div>
        <div>
          <img src="/celular-reparacion.png" alt="celular reparado" width="100%" />
        </div>
      </div>
    </div>
  );
}
