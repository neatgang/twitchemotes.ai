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
          price: "price_1PHJN1IlERZTJMCmqIRQ1Szy", // Replace with actual price ID for Basic Plan
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId
      },
    });

    const userName = user.firstName || '' + user.lastName || ''

    // await db.userApiLimit.upsert({
    //   where: { userId: userId },
    //   update: { count: 50 },
    //   create: { userId: userId, count: 50 },
    // });

  //   await db.user.update({
  //     where: { id: userId },
  //     data: {
  //         credits: {
  //             increment: 50 // Increment by 50 credits or based on the specific plan
  //         },
  //         name: userName,
  //         email: user.emailAddresses[0].emailAddress
  //     }
  // });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}