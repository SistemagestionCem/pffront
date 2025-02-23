"use client";
import { useState } from "react";
import useUsers from "./UsersFetch";
import { postOrderService } from "@/services/orderService";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { OrderErrors, OrderType } from "@/interfaces";
import { orderValidation } from "@/utils/orderValidation";

// Modal para agregar una nueva orden
interface ModalAgregarOrdenProps {
  isOpen: boolean;
  onClose: () => void;
  handleSaveOrder: (newOrder: OrderType) => void; // Añadido el tipo handleSaveOrder
}

const ModalAgregarOrden = ({ isOpen, onClose }: ModalAgregarOrdenProps) => {
  const { tecnicos, admin } = useUsers();

  const [orderData, setOrderData] = useState({
    clientEmail: "",
    clientDni: 0,
    equipmentType: "",
    imei: "",
    assignedTechnician: "",
    description: "",
    status: "PENDIENTE" as "PENDIENTE" | "INICIADO" | "FINALIZADO",
    user: "",
    createdAt: new Date(),
  });

  const [errors, setErrors] = useState<OrderErrors>({
    clientEmail: "",
    clientDni: "",
    equipmentType: "",
    imei: "",
    assignedTechnician: "",
    description: "",
    status: "PENDIENTE" as "PENDIENTE" | "INICIADO" | "FINALIZADO",
  });

  const [touchInput, setTouchInput] = useState<{ clientEmail: boolean; clientDni: boolean; equipmentType: boolean; imei: boolean; assignedTechnician: boolean; description: boolean, status: boolean }>({
    clientEmail: false,
    clientDni: false,
    equipmentType: false,
    imei: false,
    assignedTechnician: false,
    description: false,
    status: false,
  });
  const resetForm = () => {
    setOrderData({
      clientEmail: "",
      clientDni: 0,
      equipmentType: "",
      imei: "",
      assignedTechnician: "",
      description: "",
      status: "PENDIENTE",
      user: "",
      createdAt: new Date(),
    });

    setErrors({
      clientEmail: "",
      clientDni: "",
      equipmentType: "",
      imei: "",
      assignedTechnician: "",
      description: "",
      status: "",
    });

    setTouchInput({
      clientEmail: false,
      clientDni: false,
      equipmentType: false,
      imei: false,
      assignedTechnician: false,
      description: false,
      status: false,
    });
  };

  const handleSubmit = async () => {
    const selectAdmin = admin[0];
    const payload = {
      clientEmail: orderData.clientEmail.trim(),
      clientDni: Number(orderData.clientDni), // Conversión segura a número
      equipmentType: orderData.equipmentType.trim(),
      imei: orderData.imei.trim(),
      description: orderData.description.trim(),
      status: orderData.status.trim(),
      user: selectAdmin.id,
      assignedTechnician: orderData.assignedTechnician, // Evita enviar string vacío
    };

    console.log(payload);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setOrderData((prev) => ({
      ...prev,
      [name]: name === "clientDni" ? Number(value) || 0 : value.trim(), // Convertir a número solo si es clientDni
    }));

    setTouchInput((previus) => ({
      ...previus,
      [name]: true,
    }));
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target

    setTouchInput({
      ...touchInput,
      [name]: true
    })

    setErrors(orderValidation(orderData))
  }

  const isFormValid = () => {
    return (
      orderData.clientEmail.trim() !== "" &&
      orderData.clientDni !== 0 &&
      orderData.equipmentType.trim() !== "" &&
      orderData.imei.trim() !== "" &&
      orderData.assignedTechnician.trim() !== "" &&
      orderData.description.trim() !== "" &&
      orderData.status.trim() !== "" &&
      !Object.values(errors).some((error) => error !== "") // Asegura que no haya errores
    );
  };
  return isOpen ? (
    <PageTransition>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 ">
        <div className="p-6 text-black bg-white rounded-[16px] w-96 max-h-[90vh] overflow-y-auto">

          <h2 className="mb-4 text-xl font-bold">Agregar Orden</h2>
          <div className="space-y-4">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.assignedTechnician}
              title="Tecnico"
              name="assignedTechnician"
              onChange={handleInputChange}

            >
              <option value="">Seleccionar técnico</option>
              {tecnicos.map((tecnico) => (
                <option key={tecnico.id} value={tecnico.id}>
                  {tecnico.name}
                </option>
              ))}
            </select>
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.assignedTechnician && <p className="text-primary-500 text-sm">{errors.assignedTechnician}</p>}
            </div>

            <input
              type="text"
              name="clientEmail"
              placeholder="Email Cliente"
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.clientEmail}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.clientEmail && <p className="text-primary-500 text-sm">{errors.clientEmail}</p>}
            </div>

            <input
              type="number"
              name="clientDni"
              placeholder="Dni Cliente"
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.clientDni}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.clientDni && <p className="text-primary-500 text-sm">{errors.clientDni}</p>}
            </div>

            <input
              type="text"
              name="description"
              placeholder="Descripción"
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.description}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.description && <p className="text-primary-500 text-sm">{errors.description}</p>}
            </div>

            <input
              type="text"
              name="equipmentType"
              placeholder="Tipo de Dispositivo"
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.equipmentType}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.equipmentType && <p className="text-primary-500 text-sm">{errors.equipmentType}</p>}
            </div>

            <input
              type="text"
              name="imei"
              placeholder="IMEI"
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.imei}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.imei && <p className="text-primary-500 text-sm">{errors.imei}</p>}
            </div>

            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={orderData.status}
              name="status"
              title="Estado"
              onChange={handleInputChange}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Iniciado">Iniciado</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.status && <p className="text-primary-500 text-sm">{errors.status}</p>}
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 text-black bg-gray-300 rounded"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`px-4 py-2 bg-primary-500 mt-4 rounded text-white text-bodyBold flex items-center justify-center gap-2 ${!isFormValid()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                  }`}

              >
                Guardar Orden
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition >
  ) : null;
};

export default ModalAgregarOrden;
