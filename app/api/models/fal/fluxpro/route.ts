import { generateThemedEmotePrompt } from "@/app/features/editor/utils";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { db } from "@/lib/db";
import { checkSubscription } from "@/lib/oldsubscription";
import { auth } from "@clerk/nextjs/server";
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
    const { prompt, image_size, num_inference_steps, guidance_scale, num_images, enable_safety_checker, emoteType, image } = body;
    const { userId } = auth();

    // Validate input
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const finalPrompt = generateThemedEmotePrompt(prompt, emoteType); // Use emoteType to generate the final prompt

    const result = await fal.subscribe("fal-ai/flux-pro/new", {
      input: {
        prompt: finalPrompt, // Use the finalPrompt with emoteType
        image_size: image_size || "square_hd",
        num_inference_steps: num_inference_steps || 28,
        guidance_scale: guidance_scale || 3.5,
        num_images: num_images || 1,
        enable_safety_checker: enable_safety_checker !== undefined ? enable_safety_checker : true,
        image: image, // Include the image in the request if the API supports it
      },
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    const userCredits = await db.user.findUnique({
      where: { id: userId },
    });
  
    if (userCredits && userCredits.credits > 0) {
      await db.user.update({
        where: { id: userId },
        data: { credits: userCredits.credits - 1 },
      });
    }

    if (userCredits?.credits === 0) {
      return new NextResponse("You have run out of credits.")
    }

    console.log(result);

    return NextResponse.json(result);

  } catch (error) {
    console.log('[FAL_FLUX_DEV_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}