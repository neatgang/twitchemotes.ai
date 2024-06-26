import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

const priceIdToCredits: { [priceId: string]: number } = {
  'price_1PHJN1IlERZTJMCmqIRQ1Szy': 50, // Basic plan
  'price_1PHJNQIlERZTJMCmwVYr5wol': 150, // Standard plan
  'price_1PHJOOIlERZTJMCmBCw2uSBY': 300, // Basic plan
  'price_1PTXsjIlERZTJMCmk9e50tI7': 20, // Small Pack
  'price_1PTXt2IlERZTJMCmQYmhHVQV': 50, // Medium Pack
  'price_1PTXtHIlERZTJMCmVgzahz20': 100, // Large Pack
};

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
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case 'checkout.session.completed':
      if (!session?.metadata?.userId) {
        return new NextResponse("User id is required", { status: 400 });
      }

      // Retrieve the line items from the session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      if (!lineItems || !lineItems.data || lineItems.data.length === 0) {
        return new NextResponse("No line items found", { status: 400 });
      }

      if (!lineItems.data[0].price) {
        return new NextResponse("Price not found in line items", { status: 400 });
      }

      const creditsToAdd = priceIdToCredits[lineItems.data[0].price.id] || 0;

      await db.user.update({
        where: { id: session?.metadata?.userId },
        data: {
          credits: {
            increment: creditsToAdd,
          },
        },
      });

      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

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
      break;

    case 'invoice.payment_succeeded':
      const subscriptionId = session.subscription as string;

      if (!subscriptionId) {
        return new NextResponse("Subscription id is required", { status: 400 });
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      const creditsToAddInvoice = priceIdToCredits[subscription.items.data[0].price.id] || 0;

      // Retrieve the userSubscription record to get the userId
      const userSubscription = await db.userSubscription.findUnique({
        where: { stripeSubscriptionId: subscription.id },
      });

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
      });

      if (userSubscription) {
        await db.user.update({
          where: { id: userSubscription.userId },
          data: {
            credits: {
              increment: creditsToAddInvoice,
            },
          },
        });
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}