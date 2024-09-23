import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { absoluteUrl } from "@/lib/utils";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const settingsUrl = absoluteUrl("/");

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the user already has a subscription
    const existingSubscription = await db.userSubscription.findUnique({
      where: { userId },
      select: { stripeCustomerId: true }
    });

    let stripeCustomerId = existingSubscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim() || undefined,
        metadata: {
          userId: userId
        }
      });
      stripeCustomerId = customer.id;

      // Create a new UserSubscription record
      await db.userSubscription.create({
        data: {
          userId: userId,
          stripeCustomerId: stripeCustomerId
        }
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer: stripeCustomerId,
      line_items: [
        {
          price: "price_1PHJN1IlERZTJMCmqIRQ1Szy", // Basic plan price ID
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}