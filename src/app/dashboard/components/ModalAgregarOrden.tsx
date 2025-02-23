"use client";
import { useState } from "react";
import useUsers from "./UsersFetch";
import { postOrderService } from "@/services/orderService";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { OrderErrors, OrderType } from "@/interfaces";
import { orderValidation } from "@/utils/orderValidation";
import { X } from "lucide-react";

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
    clientDni: "",
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
      clientDni: "",
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
      console.log("Respuesta del servidor:", response);

      if (response && response.ok) {
        console.log("Orden creada con éxito"); // Verifica que llega aquí

        toast.success(`Bienvenido ${response.userFound.name}!`, {
          position: "top-center",
          richColors: true,
        });
        setTimeout(() => {
          console.log("Cerrando modal"); // Verifica si este mensaje aparece
          onClose();
        }, 2000);
      }
    } catch (error) {
      toast.error("Error al crear la orden", {
        position: "top-center",
        richColors: true,
      });
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setOrderData((prev) => ({
      ...prev,
       
      [name]: name === "clientDni" ? (value ? Number(value) : "") : name === "description" ? value : value.trim(), 
      
    }));

    setTouchInput((previus) => ({
      ...previus,
      [name]: true,
    }));
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      orderData.clientDni !== "" &&
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[480px] max-h-[90vh] overflow-y-auto mx-auto">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Agregar Orden</h2>
            <button
              type="button"
              title="Cerrar"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <select
              className="w-full p-2 text-black text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

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
              className="w-full p-2 text-black text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full p-2 text-black text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={orderData.clientDni}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.clientDni && <p className="text-primary-500 text-sm">{errors.clientDni}</p>}
            </div>

            <textarea
              name="description"
              placeholder="Descripción"
              className=" w-full text-black p-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[100px] placeholder-gray-400"
              value={orderData.description}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.description && <p className="text-primary-500 text-sm">{errors.description}</p>}
            </div>

            <select
              name="equipmentType"
              value={orderData.equipmentType}
              onChange={handleInputChange}
              className="w-full p-2 text-black text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar tipo de dispositivo</option>
              <option value="EQUIPO">Equipo</option>
              <option value="CELULAR">Celular</option>
              <option value="TABLET">Tablet</option>
              <option value="LAPTOP">Laptop</option>
            </select>
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.equipmentType && <p className="text-primary-500 text-sm">{errors.equipmentType}</p>}
            </div>

            <input
              type="text"
              name="imei"
              placeholder="IMEI"
              className="w-full p-2 text-black text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={orderData.imei}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.imei && <p className="text-primary-500 text-sm">{errors.imei}</p>}
            </div>

            <select
              className="w-full p-2 text-black text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={orderData.status}
              name="status"
              title="Estado"
              onChange={handleInputChange}
            >
              <option value="Pendiente">Pendiente</option>
              
            </select>
            <div className="min-h-[1px] pl-1 text-primary-500 text-sm">
              {touchInput.status && <p className="text-primary-500 text-sm">{errors.status}</p>}
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button
                className="w-full px-4 py-2 text-black bg-gray-300 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-gray-400"
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
                className={`w-full px-4 py-2 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 bg-primary-500 hover:bg-primary-600 ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""
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