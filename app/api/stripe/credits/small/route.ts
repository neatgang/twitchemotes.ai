import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { absoluteUrl } from "@/lib/utils";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const settingsUrl = absoluteUrl("/");

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const referral = searchParams.get("referral");

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price: 'price_1PTXsjIlERZTJMCmk9e50tI7', // Small Pack price ID
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        referral: referral || null,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}