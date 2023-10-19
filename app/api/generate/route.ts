import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

export const config = {
  runtime: 'edge',
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    const body = await req.json();
    const { prompt, amount, negativePrompt } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // Handle the new fields
    // if (!amount) {
    //   return new NextResponse("Amount is required", { status: 400 });
    // }

    // if (!negativePrompt) {
    //   return new NextResponse("Negative prompt is required", { status: 400 });
    // }

    const response = await replicate.run(
      "m1guelpf/emoji-diffusion:ba30355ce02ca4755d60f7f083e3c0e2593fd3ee687a0dc1fca236deb6046e4d",
      {
        input: {
          prompt: prompt,
          num_outputs: amount,
          // negative_prompt: negativePrompt,
        }
      }
    );

    // await db.prompt.create({
    //   data: {
    //     prompt: prompt,
    //     // num_outputs: amount,
    //     // negativePrompt: negativePrompt,
    //     userId: userId,
    //   }
    // });

    return NextResponse.json(response);

  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};