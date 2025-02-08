/* eslint-disable @next/next/no-img-element */
'use client'
import { Search } from "lucide-react";
import { useState } from "react";
import ModalOrden from "./components/ModalOrden"; // Importamos el modal


export default function DashboardTecnico() {
    type EstadoOrden = "Iniciado" | "En proceso" | "Finalizado";

    const [selectedOrder, setSelectedOrder] = useState<{
        date: string;
        id: string;
        imei: string;
        status: EstadoOrden;
    } | null>(null);


    const [orders] = useState<{ date: string; id: string; imei: string; status: EstadoOrden }[]>([
        { date: "06/02/25", id: "1001", imei: "987654321012345", status: "Iniciado" },
        { date: "06/02/25", id: "1002", imei: "123456789012345", status: "Finalizado" },
        { date: "07/02/25", id: "1003", imei: "321654987012345", status: "En proceso" },
        { date: "07/02/25", id: "1004", imei: "789456123012345", status: "Iniciado" },
        { date: "08/02/25", id: "1005", imei: "654321987012345", status: "Iniciado" },
        { date: "08/02/25", id: "1006", imei: "159753486012345", status: "Finalizado" },
        { date: "09/02/25", id: "1007", imei: "357159258012345", status: "En proceso" },
        { date: "09/02/25", id: "1008", imei: "753951456012345", status: "Finalizado" },
        { date: "10/02/25", id: "1009", imei: "852963741012345", status: "En proceso" },
        { date: "10/02/25", id: "1010", imei: "951357852012345", status: "Iniciado" }
    ]);

    const [usuario, setUsuario] = useState({ //cuando conectemos la base setUsuario traera los datos ver persistencia
        nombre: "Gary Jair Casas Wong",
        email: "garyjair001@hotmail.com",
        rol: "Técnico",
    });
    const [estado, setEstado] = useState("Iniciado"); //cuando le demos la funcionalidad de cambio de estado tomara el estado y actualizara

    const estadoColores = {
        Iniciado: "text-blue-500",
        "En proceso": "text-orange-500",
        Finalizado: "text-primary-500",
    };

    return (
        <div className="min-h-screen bg-secondary-700 text-white p-4 sm:p-8 max-w-screen-lg mx-auto">

            <div className="gap-16 px-4 py-8 ">

                <h2 className="display3  text-white flex justify-center w-full py-4">
                    Dashboard de Técnico
                </h2>

                <section className="bg-white text-black p-4 rounded-lg my-4">
                    <h3 className="title1 text-primary-500 border-b border-primary-900 pb-2">Datos de Usuario</h3>
                    <div className="mt-2 space-y-4">

                        <p className="flex items-center gap-4 bodyBold "><img src="/svg/user.svg" alt="Usuario" className="w-6 h-6" />
                            {usuario.nombre}
                        </p>

                        <p className="flex items-center gap-4 bodyBold"><img src="/svg/mail.svg" alt="Mail" className="w-6 h-6" />
                            {usuario.email}
                        </p>

                        <p className="flex items-center gap-4 bodyBold"><img src="/svg/rol.svg" alt="rol" className="w-6 h-6" />
                            {usuario.rol}
                        </p>
                    </div>
                </section>
            </div>

            <div className="gap-16 p-4 pb-8 ">
                <section className="bg-white text-black p-4 rounded-lg my-4">
                    <div className="flex flex-col items-start gap-4 w-full">

                    </div>
                    <h3 className="title1 text-primary-500 border-b border-primary-900 pb-2">Ordenes</h3>
                    <div className="mt-4 flex items-center rounded-lg px-3 py-2 border border-primary-500 w-full">
                        <input
                            type="text"
                            className="flex-1 outline-none"
                            placeholder="Ingresa tu orden aquí"

                        />
                        <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <Search size={16} />
                        </button>
                    </div>

                    <div className="flex justify-between items-center p-4 w-full">

                        <label className="bodyBold"><input type="radio" name="filter" className="mr-2" /> ID orden</label>
                        <label className="body"><input type="radio" name="filter" className="mr-2" /> Estado</label>
                        <label className="body"><input type="radio" name="filter" className="mr-2" /> IMEI</label>
                    </div>

                    <button className="flex justify-center items-center gap-2 px-6 py-1 rounded-lg bg-primary-500 text-white text-bodyBold">
                        Borrar
                    </button>


                    <table className="w-full mt-4 border-collapse">
                        <thead>
                            <tr className="title3">
                                <th className="p-2">Fecha</th>
                                <th className="p-2">ID orden</th>
                                <th className="p-2">IMEI</th>
                                <th className="p-2">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-black text-center body">
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="p-2">{order.date}</td>
                                    <td className="p-2">{order.id}</td>
                                    <td className="p-2">{order.imei}</td>
                                    <td className={`p-2 font-bold ${estadoColores[order.status]}`}>
                                        {order.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <ModalOrden
                    isOpen={!!selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    order={selectedOrder!}
                />
            </div>

        </div>
    );
}
