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
      const creditPackage = searchParams.get("package"); // 'small', 'medium', 'large', etc.
  
      if (!userId || !user) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!creditPackage) {
        return new NextResponse("Package not specified", { status: 400 });
      }
  
      const creditOptions: { [key: string]: { price: number; credits: number } } = {
        small: { price: 240, credits: 20 },
        medium: { price: 500, credits: 50 },
        large: { price: 800, credits: 100 }
    };
  
      const selectedPackage = creditOptions[creditPackage];
  
      if (!selectedPackage) {
        return new NextResponse("Invalid package selected", { status: 400 });
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
            price_data: {
              currency: "USD",
              product_data: {
                name: `EmoteMaker.ai ${creditPackage} Credit Pack`,
                description: `${selectedPackage.credits} credits for $${selectedPackage.price / 100}`
              },
              unit_amount: selectedPackage.price,
              recurring: { interval: "month" }
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          creditPackage
        },
      });
  
      await db.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: selectedPackage.credits
          }
        }
      });
  
      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    } catch (error) {
      console.log("[STRIPE_ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }