/* eslint-disable */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { updatePayment } from "@/services/paymentService";
import userDataStorage from "@/storage/userStore";
import orderDataStorage from "@/storage/orderStore";

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useParams();  // Usamos useParams para obtener los datos de la URL
    const { clearUserData } = userDataStorage();
    const { clearOrderData } = orderDataStorage();

    useEffect(() => {
        const collection_status = searchParams.collection_status instanceof Array ? searchParams.collection_status[0] : searchParams.collection_status;
        const external_reference = searchParams.external_reference instanceof Array ? searchParams.external_reference[0] : searchParams.external_reference;

        if (collection_status === "approved" && external_reference) {
            const update = async () => {
                try {
                    const payload = { status: "APPROVED" };
                    await updatePayment(external_reference, payload);
                    clearUserData();
                    clearOrderData();
                    window.location.href = "/login";  // Redirigir a login
                } catch (error) {
                    console.log(error);
                }
            };
            update();
        }
    }, [searchParams, router]);

    return (
        <div className="p-4 bg-gray-100 mx-auto mt-[300px] max-w-[600px]">
            <h1>Pago Exitoso</h1>
        </div>
    );
}
