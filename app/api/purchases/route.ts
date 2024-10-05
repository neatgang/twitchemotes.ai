import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { emoteId, paymentIntentId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!emoteId || !paymentIntentId) {
      return new NextResponse("Emote ID and Payment Intent ID are required", { status: 400 });
    }

    const purchase = await db.purchase.create({
      data: {
        userId,
        emoteForSaleId: emoteId,
        paymentIntentId: paymentIntentId,
      },
    });

    return new NextResponse(JSON.stringify(purchase), { status: 201 });
  } catch (error) {
    console.error("[PURCHASE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}