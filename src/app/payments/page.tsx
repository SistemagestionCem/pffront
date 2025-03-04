/* eslint-disable */
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { updatePayment } from "@/services/paymentService";
import userDataStorage from "@/storage/userStore";
import orderDataStorage from "@/storage/orderStore";

function PaymentHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { clearUserData } = userDataStorage();
    const { clearOrderData } = orderDataStorage();

    useEffect(() => {
        const collectionStatus = searchParams.get("collection_status");
        const externalReference = searchParams.get("external_reference");

        console.log("Query Params:", Object.fromEntries(searchParams.entries()));

        if (collectionStatus === "approved" && externalReference) {
            const update = async () => {
                try {
                    const payload = { status: "APPROVED" };
                    await updatePayment(externalReference, payload);
                    clearUserData();
                    clearOrderData();
                    router.push("/login"); // Redirigir a login
                } catch (error) {
                    console.log(error);
                }
            };
            update();
        }
    }, [searchParams, router]);

    return <h1>Pago Exitoso</h1>;
}

export default function PaymentPage() {
    return (
        <div className="p-4 bg-gray-100 mx-auto mt-[300px] max-w-[600px]">
            <Suspense fallback={<h1>Cargando...</h1>}>
                <PaymentHandler />
            </Suspense>
        </div>
    );
}

