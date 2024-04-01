import { checkApiLimit, getApiLimitCount, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/oldsubscription";
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
    const { prompt, amount = 1, resolution = "512x512"} = body;

//     type Template = {
//       value: string;
//       label: string;
//       prompt: string;
//     };
    
//     const selectedTemplate = templates.find((t: Template) => t.value === template);

// if (!selectedTemplate) {
//   // Handle the case where no matching template was found
//   // For example, you might return an error response
//   return new NextResponse("Invalid template", { status: 400 });
// }

// const finalPrompt = selectedTemplate.prompt.replace('${prompt}', prompt);

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

    const finalPrompt = `Design a single, vibrant, cartoonish digital emote suitable for use on a Twitch streamer's channel. The emote should depict ${prompt}, ensuring expressiveness and visibility at a small scale. It should feature exaggerated facial features appropriate for the ${prompt}, conveying a specific emotion like excitement or surprise. The background should be transparent for seamless integration into various Twitch chat backgrounds, or have a solid white background if transparency is not available. The style should be playful and friendly, with a distinct, cohesive look that could easily be part of a larger set of emotes.`

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: finalPrompt,
        size: "1024x1024",
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