import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url);
    const emoteId = searchParams.get("emoteId");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!emoteId) {
      return new NextResponse("Emote ID is required", { status: 400 });
    }

    const emoteForSale = await db.emoteForSale.findUnique({
      where: { id: emoteId },
    });

    if (!emoteForSale || emoteForSale.price === null) {
      return new NextResponse("Emote not found or price not set", { status: 404 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/emote/${emoteId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/emote/${emoteId}?canceled=true`,
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: emoteForSale.prompt,
              images: [emoteForSale.watermarkedUrl || emoteForSale.imageUrl],
            },
            unit_amount: Math.round(emoteForSale.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        emoteId: emoteForSale.id,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_PURCHASE_EMOTE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}