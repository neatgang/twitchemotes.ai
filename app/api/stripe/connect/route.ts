import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const account = await stripe.accounts.create({
      type: 'express',
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    });

    await db.profile.update({
      where: { userId: userId },
      data: { stripeConnectAccountId: account.id },
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      type: 'account_onboarding',
    });

    return new NextResponse(JSON.stringify({ url: accountLink.url }));
  } catch (error) {
    console.error("[STRIPE_CONNECT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}