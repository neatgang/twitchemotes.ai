import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { emoteForSaleId } = await req.json();

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const emoteForSale = await db.emoteForSale.findUnique({
      where: { id: emoteForSaleId },
    });

    if (!emoteForSale || emoteForSale.price === null) {
      return new NextResponse(JSON.stringify({ error: "Emote not found or price not set" }), { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: emoteForSale.prompt,
              images: [emoteForSale.watermarkedUrl || emoteForSale.imageUrl],
            },
            unit_amount: Math.round(emoteForSale.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/emote/${emoteForSale.id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/emote/${emoteForSale.id}?canceled=true`,
      metadata: {
        emoteForSaleId: emoteForSale.id,
        userId: userId,
      },
    });

    return new NextResponse(JSON.stringify({ sessionId: session.id }));
  } catch (error) {
    console.error("[STRIPE_CREATE_CHECKOUT_SESSION_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}