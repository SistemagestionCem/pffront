/* eslint-disable @next/next/no-img-element */
import Footer from "../components/footer";

export default function Home() {
  const services = [
    {
      title: 'Pantallas Rotas',
      description: 'Servicio de reparación de pantallas dañadas para todo tipo de dispositivos, incluyendo celulares, tablets y laptops. Arreglamos grietas, píxeles muertos y problemas de visualización con repuestos de alta calidad.'
    },
    {
      title: 'Baterias Defectuosas',
      description: 'Reemplazo y reparación de baterías que se descargan rápido, no cargan o causan sobrecalentamiento. Usamos repuestos de calidad para maximizar la vida útil de tu dispositivo. '
    },
    {
      title: 'Problemas de Software',
      description: 'Solución de fallos en el sistema, reinicios inesperados, errores de actualización y optimización del rendimiento. Recuperamos datos y reinstalamos software para que tu equipo funcione como nuevo. '
    }
  ]

  const chooseUs = [
    {
      title: 'Tecnicos certificados'
    },
    {
      title: 'Garantía de 6 meses'
    },
    {
      title: 'Repuestos originales'
    },
    {
      title: 'Servicio rápido'
    }
  ]

  return (
    <div className="bg-black flex flex-col items-center h-full">
    
      <div className="max-w-[1024px] text-center">
        <img alt="" src="https://www.rollingstone.com/wp-content/uploads/2024/09/iphone-16-pro-featured-image.png?w=1581&h=1054&crop=1" />
      </div>
      <div className="md:text-6xl md:p-6 text-white text-2xl text-center font-bold">
        <h1>Recupera tu dispositivo con nuestro servicio rapido y garantizado!</h1>
      </div>
      <div className="w-full sm:max-w-[768px] text-center p-4">
        <input type="text" placeholder="Rastrea tu orden" className="py-2 w-full text-center rounded-2xl" />
        <button className="px-2 py-2 bg-red-500 mt-4 w-full rounded-xl text-white font-bold">Rastrear</button>
      </div>
      <div className="md:grid md:grid-cols-3">
        {services.map((service, index) => {
          return (
            <div key={index} className="text-white m-4 p-4 border border-zinc-900 rounded-xl">
              <div className="text-lg text-zinc-300 font-bold">
                {service.title}
              </div>
              <div className="text-zinc-300">
                {service.description}
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
      <div className="p-6">
        <h3 className="text-3xl text-white font-bold text-center pb-4">Por que Elegirnos...</h3>
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 space-y-4 p-4">
        {chooseUs.map((service, index) => {
          return (
            <div key={index} className="flex min-w-[300px] items-center">
              <div className="bg-red-500 w-6 h-6 rounded-full mr-6">
              </div>
              <div className="text-zinc-300 text-lg">
                {service.title}
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
      </div>

    </div>

  );
}
