import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { absoluteUrl } from "@/lib/utils";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const settingsUrl = absoluteUrl("/");

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const isPro = searchParams.get("isPro") === "true";

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId
      }
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "EmoteMaker.ai Premium Plan",
              description: "Generate unique emotes with a single prompt. For $24/month, receive 300 credits to create custom emotes. Additional credits available at $0.08 each. "
            },
            unit_amount: 2400,
            recurring: {
              interval: "month"
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    })

    // await db.userApiLimit.upsert({
    //   where: { userId: userId },
    //   update: { count: 300 },
    //   create: { userId: userId, count: 300 },
    // });

    await db.user.update({
      where: { id: userId },
      data: {
          credits: {
              increment: 300 // Increment by 50 credits or based on the specific plan
          }
      }
  });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}