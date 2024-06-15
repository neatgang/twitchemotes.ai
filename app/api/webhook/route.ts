import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await db.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    let subscription;

    try {
      subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string
      );
    } catch (error: any) {
      console.error("Error retrieving subscription:", error.message);
      return new NextResponse(`Error retrieving subscription: ${error.message}`, { status: 500 });
    }

    // Find the user subscription by stripeCustomerId
    const userSubscription = await db.userSubscription.findUnique({
      where: {
        stripeCustomerId: invoice.customer as string,
      },
    });

    if (!userSubscription) {
      console.error("User subscription not found for customer:", invoice.customer);
      return new NextResponse("User subscription not found", { status: 404 });
    }

    const userId = userSubscription.userId;
    const priceId = subscription.items.data[0].price.id;

    // Determine the number of credits based on the subscription plan
    let creditsToAdd;
    switch (priceId) {
      case "price_1PHJN1IlERZTJMCmqIRQ1Szy":
        creditsToAdd = 50;
        break;
      case "price_premium_plan_id":
        creditsToAdd = 100;
        break;
      case "price_standard_plan_id":
        creditsToAdd = 75;
        break;
      // Add more cases for other plans
      default:
        creditsToAdd = 0;
    }

    // Update the user's credits in your database
    try {
      await db.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: creditsToAdd,
          },
        },
      });

      await db.userSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });
    } catch (error: any) {
      console.error("Error updating user or subscription:", error.message);
      return new NextResponse(`Error updating user or subscription: ${error.message}`, { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}