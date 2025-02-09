export default function Footer() {
    return(
        <div className="flex flex-col items-center justify-between m-4 max-w-[1440px] mx-auto md:px-12 px-4">
            <div className="text-white space-y-4 max-w-full md:grid md:grid-cols-3 md:gap-4 md:pb-12 w-full">
            <div className="flex flex-col items-start w-full">
            <div className="">
                <div className="text-2xl text-red-500 font-bold">
                    MobileCer
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className="text-white">
                Reparación rápida, resultados duraderos.
                </div>
            </div>
            </div>

            <div className="flex flex-col items-start space-y-2">
            <div className="text-white font-bold text-xl">
                Legal
            </div>

            <div className="flex items-center gap-4">
                <img
                className="relative w-[10.09px] h-[15.63px]"
                alt="Vector"
                src="https://c.animaapp.com/ktouw9tT/img/vector-1.svg"
                />

                <div className="">
                Política de privacidad
                </div>
            </div>

            <div className="flex items-center gap-4">
                <img
                className="relative w-[10.09px] h-[15.63px]"
                alt="Vector"
                src="https://c.animaapp.com/ktouw9tT/img/vector-1.svg"
                />

                <div className="">
                Términos de servicio
                </div>
            </div>
            </div>

            <div className="space-y-2">
            <div className="text-white font-bold text-xl text-center">
                Contacto
            </div>

            <div className="flex gap-4 items-center justify-center">
                <img
                className="relative w-[25px] h-[18.75px]"
                alt="Vector"
                src="https://c.animaapp.com/ktouw9tT/img/vector-2.svg"
                />

                <div className="">
                info@mobilecer.com
                </div>
            </div>
            </div>
        </div>

      <div className="text-white text-center">
        <p className="">
          © 2025 MobileCer
          <br />
          Todos los derechos reservados.
        </p>
      </div>
        </div>
    )
}