"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { updatePayment } from "@/services/paymentService";
import clearOrderData from "@/storage/orderStore";
import clearUserData from "@/storage/userStore";

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const status = searchParams.get("collection_status");
        const external_reference = searchParams.get("external_reference");

        if (status === "approved" && external_reference) {
            const update = async () => {
                try {
                    const payload = { status: "APPROVED" };
                    await updatePayment(external_reference, payload);
                    window.location.href = "/login";
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
            <ul>
                {Array.from(searchParams.entries()).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

