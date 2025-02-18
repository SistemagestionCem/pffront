'use client';
import { useState } from "react";
import useUsers from "./UsersFetch";
import { OrderType } from "@/interfaces";
import { postOrderService } from "@/services/orderService";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";

// Modal para agregar una nueva orden
interface ModalAgregarOrdenProps {
    isOpen: boolean;
    onClose: () => void;
    handleSaveOrder: (newOrder: OrderType) => void; // Añadido el tipo handleSaveOrder
  }
  
  const ModalAgregarOrden = ({
    isOpen,
    onClose,
  }: ModalAgregarOrdenProps) => {
    const { tecnicos, admin, clientes } = useUsers();
  
    const [orderData, setOrderData] = useState({
      assignedTechnician: "",
      cliente: "",
      description: "",
      equipmentType: "",
      imei: "",
      status: "Pendiente" as "Pendiente" | "Iniciado" | "Finalizado",
      user: "",
      createdAt: new Date(),
      id: Date.now().toString(),
    });
  
    const handleSubmit = async () => {
      const selectAdmin = admin[0];
      const payload = {
        userId: selectAdmin.id,
        clientId: orderData.cliente,
        assignedTechnicianId: orderData.assignedTechnician,
      };
  
      try {
        const response = await postOrderService(payload);
        if (response) {
          toast.success("Orden creada con éxito");
          onClose();
        }
      } catch (error) {
        toast.error("Error al crear la orden");
        console.error(error);
      }
    };
  
    return isOpen ? (
      <PageTransition>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 ">
          <div className="p-6 text-black bg-white rounded-[16px] w-96">
            <h2 className="mb-4 text-xl font-bold">Agregar Orden</h2>
            <div className="space-y-4">
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={orderData.assignedTechnician}
                title="Tecnico"
                onChange={(e) =>
                  setOrderData({
                    ...orderData,
                    assignedTechnician: e.target.value,
                  })
                }
              >
                <option value="">Seleccionar técnico</option>
                {tecnicos.map((tecnico) => (
                  <option key={tecnico.id} value={tecnico.id}>
                    {tecnico.name}
                  </option>
                ))}
              </select>
  
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={orderData.cliente}
                title="Cliente"
                onChange={(e) =>
                  setOrderData({
                    ...orderData,
                    cliente: e.target.value,
                  })
                }
              >
                <option value="">Seleccionar Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.name}
                  </option>
                ))}
              </select>
  
              <input
                type="text"
                placeholder="Descripción"
                className="w-full p-2 border border-gray-300 rounded"
                value={orderData.description}
                onChange={(e) =>
                  setOrderData({ ...orderData, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tipo de Dispositivo"
                className="w-full p-2 border border-gray-300 rounded"
                value={orderData.equipmentType}
                onChange={(e) =>
                  setOrderData({ ...orderData, equipmentType: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="IMEI"
                className="w-full p-2 border border-gray-300 rounded"
                value={orderData.imei}
                onChange={(e) =>
                  setOrderData({ ...orderData, imei: e.target.value })
                }
              />
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={status}
                title="Estado"
                onChange={(e) =>
                  setOrderData({
                    ...orderData,
                    status: e.target.value as
                      | "Pendiente"
                      | "Iniciado"
                      | "Finalizado",
                  })
                }
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Iniciado">Iniciado</option>
                <option value="Finalizado">Finalizado</option>
              </select>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 text-black bg-gray-300 rounded"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 text-white rounded bg-primary-500"
                  onClick={handleSubmit}
                >
                  Guardar Orden
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    ) : null;
  };

  export default ModalAgregarOrden;
