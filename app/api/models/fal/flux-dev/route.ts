import { db } from "@/lib/db";
import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";

export const maxDuration = 300;

export const dynamic = 'force-dynamic';

// Initialize fal client
fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, image_size, num_inference_steps, guidance_scale, num_images, enable_safety_checker } = body;

    // Validate input
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt,
        image_size: image_size || "square_hd",
        num_inference_steps: num_inference_steps || 28,
        guidance_scale: guidance_scale || 3.5,
        num_images: num_images || 1,
        enable_safety_checker: enable_safety_checker !== undefined ? enable_safety_checker : true
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log(result);

    // Optionally, you could save the request or response to a database here
    // await db.someModel.create({
    //   data: {
    //     prompt,
    //     result,
    //   }
    // });

    return NextResponse.json(result);

  } catch (error) {
    console.log('[FAL_FLUX_DEV_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}