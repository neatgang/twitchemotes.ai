import { NextResponse } from "next/server";
import * as fal from "@fal-ai/serverless-client";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

fal.config({
  credentials: process.env.FAL_KEY,
});

async function getProxiedImageUrl(originalUrl: string): Promise<string> {
  const proxyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy-image?url=${encodeURIComponent(originalUrl)}`;
  return proxyUrl;
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

    // Use the proxy for the image URL
    const proxiedImageUrl = await getProxiedImageUrl(image_url);

    const input = {
      prompt,
      image_url: proxiedImageUrl,
      duration: duration || "5",
      ratio: ratio || "16:9",
      seed: seed || undefined,
    };

    console.log("Sending input to FAL API:", input);

    const result = await fal.subscribe("fal-ai/runway-gen3/turbo/image-to-video", {
      input,
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS" && update.logs) {
          console.log("FAL API update:", update.logs);
        }
      },
    });

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
