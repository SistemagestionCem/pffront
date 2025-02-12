export default function Footer() {
  return (
    <footer className="text-white bg-secondary-700">
      <div className="container mx-auto px-[5vw] py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-start space-y-4">
            <div className="">
              <div className="text-2xl text-red-500 font-bold">MobileCer</div>
            </div>
            <p className="text-white text-subtitle2 text-shadow">
              Reparación rápida, resultados duraderos.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-white text-title2">Legal</h3>
            <div className="flex flex-col space-y-3">
              <a
                target="_blank"
                href="/politicas-de-privacidad"
                className="inline-flex items-center text-white transition-all duration-300 text-subtitle2 hover:text-primary-500"
              >
                <i className="mr-2 text-xs fas fa-chevron-right"></i>
                Política de privacidad
              </a>
              <a
                target="_blank"
                href="/terminos-y-condiciones"
                className="inline-flex items-center text-white transition-all duration-300 text-subtitle2 hover:text-primary-500"
              >
                <i className="mr-2 text-xs fas fa-chevron-right"></i>
                Términos de servicio
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-white text-title2">Contacto</h3>
            <a
              href="mailto:soporte@mabilecer.pe"
              className="inline-flex items-center text-white transition-all duration-300 text-subtitle2 hover:text-primary-500"
            >
              <i className="mr-2 fas fa-envelope"></i>
              soporte@mabilecer.pe
            </a>
          </div>
        </div>

        <div className="mt-[16px] border-t border-white pt-[8px] text-center text-body text-shadow">
          <p className="text-[#AAAAAA]">© 2025 MOBILECER SAC</p>
          <p className="mt-[4px] text-[#AAAAAA]">
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
