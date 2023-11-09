import Replicate from "replicate";
// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

// export const config = {
//   runtime: 'edge',
// }

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    const body = await req.json();
    const { finalPrompt } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!finalPrompt) {
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
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      {
        input: {
          prompt: finalPrompt,
          // num_outputs: 1,
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