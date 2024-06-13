import { checkSubscription } from "@/lib/subscription";
import { checkApiLimit, getApiLimitCount, incrementApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { db } from "@/lib/db";
import { emoteTypes } from "@/types/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { description, prompt } = body;

      console.log(`${description}, ${prompt}`)
  
      const finalPrompt = prompt.replace('${description}', description);
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: finalPrompt,
        // prompt: prompt,
        size: '1024x1024',
        quality: "standard",
      });
  
      return NextResponse.json(response.data);
    } catch (error) {
      console.error('[IMAGE_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };