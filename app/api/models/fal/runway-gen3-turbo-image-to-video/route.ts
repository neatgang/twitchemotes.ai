import { NextResponse } from "next/server";
import * as fal from "@fal-ai/serverless-client";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

fal.config({
  credentials: process.env.FAL_KEY,
});

async function uploadImageToFal(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    const file = new File([blob], 'image.png', { type: blob.type });
    return await fal.storage.upload(file);
  } catch (error) {
    console.error('Error uploading image to FAL:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { model, prompt, image_url, duration, ratio, seed } = body;
    const { userId } = auth();

    console.log("Received request body:", body);

    if (!image_url) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userCredits = await db.user.findUnique({
      where: { id: userId },
    });
  
    if (!userCredits || userCredits.credits <= 0) {
      return new NextResponse("Insufficient credits", { status: 403 });
    }

    // Upload the image to FAL's storage
    let falImageUrl;
    try {
      falImageUrl = await uploadImageToFal(image_url);
    } catch (error) {
      console.error('Error uploading image to FAL:', error);
      return new NextResponse(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 400 });
    }

    const input = {
      prompt,
      image_url: falImageUrl,
      duration: duration || "5",
      ratio: ratio || "16:9",
      seed: seed || undefined,
    };

    console.log("Sending input to FAL API:", input);

    let result;
    try {
      result = await fal.subscribe("fal-ai/runway-gen3/turbo/image-to-video", {
        input,
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS" && update.logs) {
            console.log("FAL API update:", update.logs);
          }
        },
      });
    } catch (error) {
      console.error('Error calling FAL API:', error);
      if (error instanceof Error) {
        return new NextResponse(`FAL API error: ${error.message}`, { status: 500 });
      } else {
        return new NextResponse('Unknown error occurred', { status: 500 });
      }
    }

    console.log("FAL API result:", result);

    await db.user.update({
      where: { id: userId },
      data: { credits: userCredits.credits - 1 },
    });

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('[FAL_RUNWAY_GEN3_TURBO_IMAGE_TO_VIDEO_ERROR]', error);
    if (error.body && error.body.detail) {
      console.error('Error details:', error.body.detail);
    }
    return new NextResponse(error.message || "Internal Server Error", { status: error.status || 500 });
  }
}
