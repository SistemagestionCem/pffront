export const users = [
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
        id: "0194f012-973c-72ed-b4d1-54d514574094",
        name: "María González",
        email: "user@example.com",
        password: "user",
        phone: "987654321",
        role: "User",
        createdAt: new Date("2025-02-10T14:00:00.000Z"),
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

export const orders = [
    {
        id: "0194f012-9739-76ba-9370-267f48e402d1",
        clientEmail: "user@example.com",
        clientDni: 12345678,
        equipmentType: "Smartphone",
        imei: "123456789012345",
        assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574093",
        description: "Pantalla rota",
        status: "Pendiente",
        user: "0194f012-973c-72ed-b4d1-54d514574094",
        createdAt: new Date("2025-02-10T13:36:02.497Z"),
    },
    {
        id: "0194f012-9739-76ba-9370-267f48e402d2",
        clientEmail: "user@example.com",
        clientDni: 12345678,
        equipmentType: "Laptop",
        imei: "987654321098765",
        assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574093",
        description: "Fallo en la batería",
        status: "Iniciado",
        user: "0194f012-973c-72ed-b4d1-54d514574094",
        createdAt: new Date("2025-02-11T10:00:00.000Z"),
    },
    {
        id: "0194f012-9739-76ba-9370-267f48e402d5",
        clientEmail: "example1@example.com",
        clientDni: 13579246,
        equipmentType: "Smartwatch",
        imei: "556677889900112",
        assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574099",
        description: "No carga la batería",
        status: "Pendiente",
        user: "0194f012-973c-72ed-b4d1-54d514574100",
        createdAt: new Date("2025-02-14T12:20:00.000Z")
    },
    {
        id: "0194f012-9739-76ba-9370-267f48e402d6",
        clientEmail: "example2@example.com",
        clientDni: 24681357,
        equipmentType: "Consola de videojuegos",
        imei: "667788990011223",
        assignedTechnician: "0194f012-973c-72ed-b4d1-54d514574101",
        description: "Sobrecalentamiento",
        status: "Finalizado",
        user: "0194f012-973c-72ed-b4d1-54d514574102",
        createdAt: new Date("2025-02-15T09:10:00.000Z")
    }
    
];