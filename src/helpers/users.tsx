import { UserType } from "@/interfaces";

export const users: UserType[] = [
  {
    id: "0194f012-973c-72ed-b4d1-54d514574093",
    name: "Juan Pérez",
    email: "tecnico@example.com",
    password: "tecnico",
    phone: "123456789",
    role: "Technician",
    createdAt: new Date("2025-02-10T13:36:02.497Z"),
  },
  {
    id: "0194f012-973c-72ed-b4d1-54d514574096",
    name: "Ana Torres",
    email: "tecnico2@example.com",
    password: "tecnico",
    phone: "234567891",
    role: "Technician",
    createdAt: new Date("2025-02-10T14:15:00.000Z"),
  },
  {
    id: "0194f012-973c-72ed-b4d1-54d514574097",
    name: "Luis Fernández",
    email: "tecnico3@example.com",
    password: "tecnico",
    phone: "345678912",
    role: "Technician",
    createdAt: new Date("2025-02-10T14:45:00.000Z"),
  },
  {
    id: "0194f012-973c-72ed-b4d1-54d514574094",
    name: "María González",
    email: "user1@example.com",
    password: "user",
    phone: "987654321",
    role: "User",
    createdAt: new Date("2025-02-10T14:00:00.000Z"),
  },
  {
    id: "0194f012-973c-72ed-b4d1-54d514574098",
    name: "Pedro López",
    email: "user2@example.com",
    password: "user",
    phone: "456789123",
    role: "User",
    createdAt: new Date("2025-02-10T15:10:00.000Z"),
  },
  {
    id: "0194f012-973c-72ed-b4d1-54d514574099",
    name: "Sofía Martínez",
    email: "user3@example.com",
    password: "user",
    phone: "567891234",
    role: "User",
    createdAt: new Date("2025-02-10T15:20:00.000Z"),
  },
  {
    id: "0194f012-973c-72ed-b4d1-54d514574100",
    name: "Daniela Ramírez",
    email: "user4@example.com",
    password: "user",
    phone: "678912345",
    role: "User",
    createdAt: new Date("2025-02-10T15:30:00.000Z"),
  },
  {
    id: "0194f012-973c-72ed-b4d1-54d514574101",
    name: "Miguel Herrera",
    email: "user5@example.com",
    password: "user",
    phone: "789123456",
    role: "User",
    createdAt: new Date("2025-02-10T15:40:00.000Z"),
  },
  {
    id: "0194f012-973c-72ed-b4d1-54d514574095",
    name: "Carlos Rodríguez",
    email: "admin@example.com",
    password: "admin",
    phone: "555666777",
    role: "Admin",
    createdAt: new Date("2025-02-10T15:00:00.000Z"),
  },
];

// export const orders: OrderType[] = [
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d1",
//     clientEmail: "user1@example.com",
//     clientDni: 12345678,
//     equipmentType: "Smartphone",
//     imei: "123456789012345",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574097",
//     description: "Pantalla rota",
//     status: "Pendiente",
//     user: "0194f012-973c-72ed-b4d1-54d514574094",
//     createdAt: new Date("2025-02-10T13:36:02.497Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d2",
//     clientEmail: "user2@example.com",
//     clientDni: 23456789,
//     equipmentType: "Laptop",
//     imei: "987654321098765",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574096",
//     description: "Fallo en la batería",
//     status: "Iniciado",
//     user: "0194f012-973c-72ed-b4d1-54d514574098",
//     createdAt: new Date("2025-02-11T10:00:00.000Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d3",
//     clientEmail: "user3@example.com",
//     clientDni: 34567890,
//     equipmentType: "Tablet",
//     imei: "567890123456789",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574093", // Juan Pérez
//     description: "No enciende",
//     status: "Finalizado",
//     user: "0194f012-973c-72ed-b4d1-54d514574099",
//     createdAt: new Date("2025-02-12T14:45:00.000Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d4",
//     clientEmail: "user4@example.com",
//     clientDni: 45678901,
//     equipmentType: "PC de escritorio",
//     imei: "112233445566778",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574096", // Ana Torres (1 orden)
//     description: "Fuente de alimentación dañada",
//     status: "Pendiente",
//     user: "0194f012-973c-72ed-b4d1-54d514574100",
//     createdAt: new Date("2025-02-13T08:30:00.000Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d5",
//     clientEmail: "user5@example.com",
//     clientDni: 56789012,
//     equipmentType: "Smartwatch",
//     imei: "556677889900112",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574097", // Luis Fernández (2 órdenes)
//     description: "No carga la batería",
//     status: "Pendiente",
//     user: "0194f012-973c-72ed-b4d1-54d514574101",
//     createdAt: new Date("2025-02-14T12:20:00.000Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d6",
//     clientEmail: "user1@example.com",
//     clientDni: 67890123,
//     equipmentType: "Consola de videojuegos",
//     imei: "667788990011223",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574097", // Luis Fernández
//     description: "Sobrecalentamiento",
//     status: "Iniciado",
//     user: "0194f012-973c-72ed-b4d1-54d514574094",
//     createdAt: new Date("2025-02-15T09:10:00.000Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d7",
//     clientEmail: "user2@example.com",
//     clientDni: 78901234,
//     equipmentType: "Smartphone",
//     imei: "334455667788990",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574093", // Juan Pérez
//     description: "No reconoce SIM",
//     status: "Pendiente",
//     user: "0194f012-973c-72ed-b4d1-54d514574098",
//     createdAt: new Date("2025-02-16T11:25:00.000Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d8",
//     clientEmail: "user3@example.com",
//     clientDni: 89012345,
//     equipmentType: "Impresora",
//     imei: "778899001122334",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574096", // Ana Torres
//     description: "Atasco de papel frecuente",
//     status: "Iniciado",
//     user: "0194f012-973c-72ed-b4d1-54d514574099",
//     createdAt: new Date("2025-02-17T15:00:00.000Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402d9",
//     clientEmail: "user4@example.com",
//     clientDni: 90123456,
//     equipmentType: "Router",
//     imei: "990011223344556",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574097", // Luis Fernández
//     description: "No conecta a internet",
//     status: "Finalizado",
//     user: "0194f012-973c-72ed-b4d1-54d514574100",
//     createdAt: new Date("2025-02-18T09:45:00.000Z"),
//   },
//   {
//     id: "0194f012-9739-76ba-9370-267f48e402e0",
//     clientEmail: "user5@example.com",
//     clientDni: 10234567,
//     equipmentType: "Tablet",
//     imei: "112233445566778",
//     assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574093", // Juan Pérez
//     description: "Botón de encendido roto",
//     status: "Finalizado",
//     user: "0194f012-973c-72ed-b4d1-54d514574101",
//     createdAt: new Date("2025-02-19T12:10:00.000Z"),
//   },
// ];
