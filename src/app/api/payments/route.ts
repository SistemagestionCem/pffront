import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || "TEST-3199109244618331-021713-d4d42a8101b6ccbf8e5e1adffbae335e-111679968";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, title, description, quantity, unit_price, productId, external } = body;

    const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [{ id: productId, title, description, quantity, currency_id: "UYU", unit_price }],
        payment_methods: { excluded_payment_types: [{ id: "ticket" }], installments: 1 },
        metadata: { client_id: clientId, product_id: productId },
        external_reference: external,
        back_urls: {
          success: "https://pffront-fawn.vercel.app/payments",
          failure: "https://pffront-fawn.vercel.app/payments",
          pending: "https://pffront-fawn.vercel.app/payments"
        },
        auto_return: "approved"
      }
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error("Error creando el pago:", error);
    return NextResponse.json({ error: "No se pudo generar el pago" }, { status: 500 });
  }
}