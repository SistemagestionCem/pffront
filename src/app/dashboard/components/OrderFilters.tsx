/* eslint-disable */
import { useState, useEffect } from "react";

const estadosOrden = [
  "PENDIENTE",
  "REVISION",
  "CONFIRMADO",
  "CANCELADO",
  "REPARACION",
  "FINALIZADO",
  "PAGO",
  "RETIRADO",
];

const tiposEquipo = ["CELULAR", "TABLET", "LAPTOP"];

export default function OrderFilters({ orders, onFilterChange }: any) {
  const [estado, setEstado] = useState("");
  const [tipoEquipo, setTipoEquipo] = useState("");
  const [ordenFecha, setOrdenFecha] = useState("");

  useEffect(() => {
    // Filtrar las órdenes según el estado y tipo de equipo
    let filteredOrders = orders.filter((order: any) => {
      const matchesEstado = estado ? order.status === estado : true;
      const matchesTipoEquipo = tipoEquipo ? order.equipmentType === tipoEquipo : true;

      return matchesEstado && matchesTipoEquipo;
    });

    // Ordenar las órdenes por fecha si es necesario
    if (ordenFecha) {
      filteredOrders = filteredOrders.sort((a: any, b: any) => {
        const dateA = a.date;
        const dateB = b.date;

        return ordenFecha === "asc"
          ? dateA.localeCompare(dateB)
          : dateB.localeCompare(dateA);
      });
    }

    // Pasamos las órdenes filtradas y ordenadas al componente padre
    onFilterChange(filteredOrders);
  }, [estado, tipoEquipo, ordenFecha, orders, onFilterChange]);

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg flex flex-col gap-3">
      <select
        className="p-2 border rounded"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value="">Todos los estados</option>
        {estadosOrden.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded"
        value={tipoEquipo}
        onChange={(e) => setTipoEquipo(e.target.value)}
      >
        <option value="">Todos los equipos</option>
        {tiposEquipo.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded"
        value={ordenFecha}
        onChange={(e) => setOrdenFecha(e.target.value)}
      >
        <option value="">Ordenar por fecha</option>
        <option value="asc">Fecha Ascendente</option>
        <option value="desc">Fecha Descendente</option>
      </select>
    </div>
  );
}
