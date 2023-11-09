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
  auth: process.env.REPLICATE_API_TOKEN || '',
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
      "fofr/sdxl-emoji:fadf75f542463e8fd1e3d83a0775ad0f3a0fd2ca3f6bb5ad52a7639cdf8ba93f",
      {
        input: {
          prompt: finalPrompt,
          negative_prompt: "",
          // width: "1024",
          // height: "1024",
          // num_outputs: 1,
          // scheduler: "K_EULER",
          // num_inference_steps: 50,
          // guidance_scale: 7.5,
          // prompt_strength: 0.8,
          // refine: "no_refiner",
          // high_noise_frac: 0.8,
          // lora_scale: 0.6,
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

    console.log(response)

    return NextResponse.json(response);

  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};