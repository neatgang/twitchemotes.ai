import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

const priceIdToCredits: { [priceId: string]: number } = {
  'price_1PHJN1IlERZTJMCmqIRQ1Szy': 50, // Basic plan
  'price_1PHJNQIlERZTJMCmwVYr5wol': 150, // Standard plan
  'price_1PHJOOIlERZTJMCmBCw2uSBY': 300, // Basic plan
};

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

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
    })

    const creditsToAdd = priceIdToCredits[subscription.items.data[0].price.id] || 0;

    await db.user.update({
      where: { id: session?.metadata?.userId },
      data: {
        credits: {
          increment: creditsToAdd,
        },
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })

    const creditsToAdd = priceIdToCredits[subscription.items.data[0].price.id] || 0;

    await db.user.update({
      where: { id: session?.metadata?.userId },
      data: {
        credits: {
          increment: creditsToAdd,
        },
      },
    });
  }

  return new NextResponse(null, { status: 200 })
};