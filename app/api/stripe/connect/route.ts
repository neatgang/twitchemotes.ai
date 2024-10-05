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

    console.log("Creating Stripe account for user:", userId);
    const account = await stripe.accounts.create({
      type: 'express',
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    });
    console.log("Stripe account created:", account.id);

    console.log("Updating user profile with Stripe account ID");
    await db.profile.update({
      where: { userId: userId },
      data: { stripeConnectAccountId: account.id },
    });

    console.log("Creating account link");
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      type: 'account_onboarding',
    });

    console.log("Returning account link URL");
    return new NextResponse(JSON.stringify({ url: accountLink.url }));
  } catch (error) {
    console.error("[STRIPE_CONNECT_ERROR]", error);
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } else {
      return new NextResponse(JSON.stringify({ error: "An unknown error occurred" }), { status: 500 });
    }
  }
}