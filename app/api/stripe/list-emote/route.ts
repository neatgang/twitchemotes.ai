import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const settingsUrl = absoluteUrl("/profile");

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const { emoteId, price } = await req.json();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const emote = await db.emote.findUnique({
      where: { id: emoteId, userId },
    });

    if (!emote) {
      return new NextResponse("Emote not found", { status: 404 });
    }

    const stripeProduct = await stripe.products.create({
      name: `Emote: ${emote.prompt}`,
      description: `${emote.style} style emote created with ${emote.model}`,
      images: [emote.imageUrl!],
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100), // Convert to cents
      currency: 'usd',
    });

    const emoteForSale = await db.emoteForSale.create({
      data: {
        emoteId: emote.id,
        imageUrl: emote.imageUrl!,
        watermarkedUrl: emote.imageUrl!, // You might want to generate a watermarked version
        prompt: emote.prompt!,
        price: price,
        style: emote.style,
        model: emote.model,
        userId: userId,
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
        stripePriceAmount: Math.round(price * 100),
        stripePriceCurrency: 'usd',
        status: 'PUBLISHED',
      },
    });

    return new NextResponse(JSON.stringify({ success: true, emoteForSale }));
  } catch (error) {
    console.log("[STRIPE_LIST_EMOTE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}