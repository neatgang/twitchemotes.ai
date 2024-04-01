import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, prompt, imageUrl } = await req.json();

  try {
    const emote = await prisma.emote.create({
      data: {
        userId,
        prompt,
        imageUrl,
      },
    });

    return NextResponse.json(emote);
  } catch (error) {
    console.log('[SAVE_EMOTE_ERROR]', error);
    return new NextResponse("Failed to create emote", { status: 500 });
  }
}