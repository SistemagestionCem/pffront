export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <header className="container mx-auto px-4 py-6 md:py-12">
        <nav className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-red-500">MobileFix</h1>
          <button className="text-red-500 border-red-500 px-4 py-2 border rounded-xl">
            LogIn
          </button>
        </nav>

        <div className="text-center space-y-6">
        <div className="flex justify-center">
              <img 
                src="https://www.rollingstone.com/wp-content/uploads/2024/09/iphone-16-pro-featured-image.png?w=1581&h=1054&crop=1" 
                alt="Reparación" 
                className="rounded-3xl object-cover h-full md:max-w-[768px] opacity-70"
              />
            </div>
          <p className="text-gray-400 text-xl md:text-xl max-w-2xl mx-auto">
            Recupera tu dispositivo con nuestro servicio rápido y garantizado
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl">
            Solicitar Reparación
          </button>
        </div>
      </header>


      <section className="container mx-auto px-4 py-6">
        <h3 className="text-2xl font-bold text-center mb-4 md:text-4xl md:mb-8">Nuestros Servicios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {['Pantallas Rotas', 'Baterías Defectuosas', 'Problemas de Software'].map((service) => (
            <div key={service} className="border-zinc-900 transition-colors border rounded-3xl hover:bg-red-500">
              <div className="p-4">
                <h3 className="text-white font-bold">{service}</h3>
              </div>
              <div className="p-4 text-gray-300">
                <p>Solución rápida y profesional con componentes de alta calidad.</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="py-6">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 lg:text-4xl">¿Por qué elegirnos?</h3>
          <div className="grid md:grid-cols-2 md:gap-2 items-center">
            <div className="space-y-4 md:mx-auto">
              {[
                'Técnicos certificados',
                'Garantía de 6 meses',
                'Repuestos originales',
                'Servicio express'
              ].map((item, index) => (
                <div key={item} className="flex items-center space-x-4">
                  <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <img 
                src="https://images.pexels.com/photos/719399/pexels-photo-719399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Reparación" 
                className="rounded-3xl object-cover h-full md:max-w-[400px] mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-500 py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <p>© 2024 MobileFix - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
