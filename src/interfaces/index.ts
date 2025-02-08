export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

export interface FormDataType {
    email: string;
    password: string;
}

export interface RegisterFormType {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}