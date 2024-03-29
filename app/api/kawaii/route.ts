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
    const { prompt, amount = 1, emotion, additionalAttributes} = body;


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

    // if (!resolution) {
    //   return new NextResponse("Resolution is required", { status: 400 });
    // }

    if (!emotion) {
      return new NextResponse("Emotion is required", { status: 400 });
    }

    if (!additionalAttributes) {
      return new NextResponse("Additional Attributes are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const finalPrompt = `Create a single kawaii-style emote icon, where the subject can be an ${prompt}, with an ${emotion} expression. The icon should have distinct, large eyes and a fitting mouth to express the emotion. Enhance the character with ${additionalAttributes}, like a color scheme, accessories, or background elements that complement the main subject. The entire icon should be presented with a clean outline, pastel colors, and a drop shadow for a slight 3D effect on a plain background to maintain focus on the character itself.`

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: finalPrompt,
      size: '1024x1024',
      quality: "standard",
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