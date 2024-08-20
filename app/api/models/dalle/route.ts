import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/oldsubscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { db } from "@/lib/db";
import { generateThemedEmotePrompt } from "@/app/features/editor/utils";

export const maxDuration = 300;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    console.log('User ID:', userId);

    const body = await req.json();
    console.log('Request Body:', body);

    const { prompt, amount = 1, resolution = "1024x1024" } = body;
    console.log('Parsed Body:', { prompt, amount, resolution });

    if (!userId) {
      console.error('Unauthorized: No user ID');
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      console.error('OpenAI API Key not configured');
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!prompt) {
      console.error('Prompt is required');
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      console.error('Amount is required');
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      console.error('Resolution is required');
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const userCredits = await db.user.findUnique({
      where: { id: userId },
    });
    console.log('User Credits:', userCredits);

    if (userCredits && userCredits.credits > 0) {
      await db.user.update({
        where: { id: userId },
        data: { credits: userCredits.credits - 1 },
      });
      console.log('Credits updated for user:', userId);
    }

    if (userCredits?.credits === 0) {
      console.error('User has run out of credits');
      return new NextResponse("You have run out of credits.", { status: 403 });
    }

    // const finalPrompt = generateThemedEmotePrompt(prompt, emoteType); // Generate themed prompt
    // console.log('Final Prompt:', finalPrompt);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
      quality: "standard",
    });

    // const images = response.data
    //   .filter((image): image is { url: string } => !!image.url) // Filter out images without a URL

    // console.log('Image Objects:', images);

    console.log("response", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}