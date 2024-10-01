import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { env } from "@/env.mjs";
import { v4 as uuidv4 } from "uuid"
import axios from "axios";
import { auth } from "@clerk/nextjs/server"; // Import the auth function from Clerk

export const maxDuration = 300;

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log('[SAVE_EMOTE] Starting emote save process');
  
  // Get the userId from the auth context
  const { userId } = auth();
  
  if (!userId) {
    console.error('[SAVE_EMOTE_ERROR] Unauthorized: No user ID found');
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { prompt, imageUrl, style, model } = await req.json();
  console.log('[SAVE_EMOTE] Received data:', { userId, prompt, style, model });

  try {
    console.log('[SAVE_EMOTE] Fetching image from URL');
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
    console.log('[SAVE_EMOTE] Image fetched and converted to base64');

    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY,
      },
      region: "us-east-1",
    });

    const BUCKET_NAME = "pprcanvas";
    const imageId = uuidv4();

    console.log('[SAVE_EMOTE] Uploading image to S3');
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: imageId,
        Body: Buffer.from(imageBase64!, "base64"),
        ContentEncoding: "base64",
        ContentType: "image/gif",
      })
      .promise();
    console.log('[SAVE_EMOTE] Image uploaded successfully');

    const s3ImageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${imageId}`;
    console.log('[SAVE_EMOTE] S3 Image URL:', s3ImageUrl);

    console.log('[SAVE_EMOTE] Creating emote in database');
    const emote = await prisma.emote.create({
      data: {
        userId,
        prompt,
        imageUrl: s3ImageUrl,
        style,
        model,
        createdAt: new Date(),
      },
    });
    console.log('[SAVE_EMOTE] Emote created successfully:', emote);

    return NextResponse.json(emote);
  } catch (error) {
    console.error('[SAVE_EMOTE_ERROR] Detailed error:', error);
    return new NextResponse("Failed to create emote", { status: 500 });
  }
}