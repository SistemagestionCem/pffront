import { OrdeTypeValidate } from "@/interfaces";

export const orderValidation = (input: OrdeTypeValidate) => {
    const errors = { clientEmail: "", clientDni: "", equipmentType: "", imei: "", assignedTechnician: "", description: "", status: "" }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const equipmentregex = /^(CELULAR|TABLET|LAPTOP)$/;
    const imeiregex = /^\d{15}$/;
    const descriptionregex = /^(?=.{15,}).+$/;


    if (!input.clientEmail) {
        errors.clientEmail = "Campo Requerido"
    } else if (!emailRegex.test(input.clientEmail)) {
        errors.clientEmail = "Ingresa un EMAIL válido, ejemplo: usuario@ejemplo.com."
    }

    if (!input.clientDni) {
        errors.clientDni = "Campo Requerido"
    } else if (input.clientDni < 10000000 || input.clientDni > 99999999) {
        errors.clientDni = "Ingrese un DNI valido, debe contener 8 números."
    }

    if (!input.equipmentType) {
        errors.equipmentType = "Campo Requerido"
    } else if (!equipmentregex.test(input.equipmentType)) {
        errors.equipmentType = "Ingrese un EQUIPO valido, debe ser CELULAR, TABLET o LAPTOP (mayúsculas)."
    }

    if (!input.imei) {
        errors.imei = "Campo Requerido"
    } else if (!imeiregex.test(input.imei)) {
        errors.imei = "Ingrese un IMEI valido, debe contener 15 números."
    }

    if (!input.assignedTechnician) {
        errors.assignedTechnician = "Debe seleccionar un TECNICO.";
    }

    if (!input.description) {
        errors.description = "Campo Requerido"
    } else if (!descriptionregex.test(input.description)) {
        errors.description = "Ingrese una DESCRIPCION valida, debe contener al menos 15 caracteres."
    }

    return errors;
}