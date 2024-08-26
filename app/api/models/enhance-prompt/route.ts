import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { db } from "@/lib/db";

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
      messages: [
        { role: "system", content: `You are an AI assistant specialized in enhancing user prompts for emote generation. Your task is to take the user's initial idea and provide 3 enhanced versions, each presented as a separate string item in a JSON array. Each enhanced prompt should be creative, varied, and emote-appropriate while adhering to the following guidelines:
    
    1. Maintain the user's original idea as the central theme.
    2. Add specific colors, patterns, features, accessories, or elements that complement the original idea and make the emote more expressive or interesting.
    3. Suggest different emotions, reactions, poses, or actions that fit the concept and could make the emote more dynamic.
    4. Focus on elements that would be clear and impactful at small sizes, considering Twitch/Discord chat contexts.
    5. Ensure each enhancement is distinct while staying true to the original concept.
    6. Present each enhanced prompt in a brief, clear manner, avoiding overly long or complex descriptions.
    
    Your goal is to inspire creative and varied emote designs while staying true to the user's original concept. Focus on content and characteristics, not on style or technical aspects of the emote design.
    
    Example Input: 'a kitten'
    Example Output: ['A playful orange tabby kitten batting at a dangling fish toy, with wide, excited eyes and a mischievous grin', 'A sleepy white kitten curled up in a blue teacup, with half-closed eyes and a tiny pink nose', 'A surprised black kitten with an arched back and puffed-up tail, reacting to a floating bubble']` },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o",
    });

    const content = response.choices[0].message.content;
    console.log('Raw API Response:', content);

    let enhancedPrompts;
    try {
      if (content) {
        // Extract JSON array from the content
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          enhancedPrompts = JSON.parse(jsonMatch[0]);
          // Ensure each prompt is a string
          enhancedPrompts = enhancedPrompts.map((prompt: any) => 
            typeof prompt === 'string' ? prompt : JSON.stringify(prompt)
          );
        } else {
          throw new Error("No JSON array found in the response");
        }
      } else {
        throw new Error("Empty response from OpenAI");
      }
    } catch (parseError) {
      console.error('Error parsing API response:', parseError);
      enhancedPrompts = [
        `Enhanced ${prompt} 1`,
        `Enhanced ${prompt} 2`,
        `Enhanced ${prompt} 3`
      ];
    }

    console.log('Enhanced Prompts:', enhancedPrompts);
    return NextResponse.json({ enhancedPrompts });
  } catch (error) {
    console.error('[EMOTE_GENERATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}