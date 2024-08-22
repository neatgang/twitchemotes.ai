import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/oldsubscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { db } from "@/lib/db";
import { generateThemedEmotePrompt } from "@/app/features/editor/utils";
import AWS from "aws-sdk";
import { env } from "@/env.mjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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

    const { prompt } = body;
    console.log('Parsed Body:', { prompt });

    if (!userId) {
      console.error('Unauthorized: No user ID');
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      console.error('OpenAI API Key not configured');
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
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

    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are an AI assistant specialized in enhancing user prompts for emote generation. Your task is to take the user's initial idea and expand it with creative, varied, and emote-appropriate details. Guidelines: 1) Maintain the user's original idea as the central theme. 2) Add specific colors, patterns, features, accessories, or elements that complement the original idea and make the emote more expressive or interesting. 3) Suggest different emotions, reactions, poses, or actions that fit the concept and could make the emote more dynamic. 4) Focus on elements that would be clear and impactful at small sizes, considering Twitch/Discord chat contexts. 5) Provide 2-3 varied enhancement suggestions for each input, ensuring each is distinct while staying true to the original concept. 6) Present each enhanced prompt in a brief, clear manner, avoiding overly long or complex descriptions. Example Input: 'a kitten' Example Output: A playful orange tabby kitten batting at a dangling fish toy, with wide, excited eyes and a mischievous grin. Remember, your goal is to inspire creative and varied emote designs while staying true to the user's original concept. Focus on content and characteristics, not on style or technical aspects of the emote design." }, { role: "user", content: prompt }],
        model: "gpt-4o",
    });

    // const images = response.data; // Assuming this is the array of generated images

    // Loop through each generated image and save it
    // for (const image of images) {
    //   const imageUrl = image.url; // Adjust according to your actual image URL structure

    //   // Convert image URL to S3 URL or keep as is if already using S3 URLs
    //   const s3ImageUrl = imageUrl; // Placeholder for any conversion logic if necessary

    //   // Save each emote to the database
    //   await db.emote.create({
    //     data: {
    //       userId: userId,
    //       prompt: prompt,
    //       imageUrl: s3ImageUrl,
    //       // Add any other fields as necessary
    //     },
    //   });
    // }

    console.log('Response:', response.choices[0].message.content);
    // Return a success response or the saved emotes as needed
    return NextResponse.json({ enhancedPrompt: response.choices[0].message.content });
  } catch (error) {
    console.error('[EMOTE_GENERATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}