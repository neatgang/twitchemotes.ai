import { checkApiLimit, getApiLimitCount, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const finalPrompt = `Design a vibrant, cartoonish digital emote suitable for use on a Twitch streamer's channel, centered in the image with a solid white background. The emote should depict a single emotion from ${prompt}, ensuring it is expressive and visible at a small scale. It should feature exaggerated facial features appropriate for the emotion being conveyed, like excitement or surprise. The style should be playful and friendly, with a distinct, cohesive look.`
    
const finalPrompt2 = `Design a single, vibrant, cartoonish digital emote suitable for use on a Twitch streamer's channel. The emote should depict ${prompt}, ensuring expressiveness and visibility at a small scale. It should feature exaggerated facial features appropriate for the ${prompt}, conveying a specific emotion like excitement or surprise. The background should be a solid white background. The style should be playful and friendly, with a distinct, cohesive look that could easily be part of a larger set of emotes."`
    const finalPrompt1 = `Create a ${prompt} emote suitable for a Twitch streamer's channel. The emote should be distinct and convey a different emotion or reaction commonly used during live streams, such as excitement, disappointment, surprise, and laughter. The emote should be designed with a vibrant, cartoonish style, have rounded features for a friendly appearance, and be clearly visible at a small size. Make the emote stand out, but ensure it follows a cohesive visual theme.`

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: finalPrompt,
        // n: amount,
        // size: resolution,
      });

    console.log(response.data[0].url);

    if (!isPro) {
      await incrementApiLimit();
    }

    // Return the response data
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};