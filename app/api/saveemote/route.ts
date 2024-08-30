import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { env } from "@/env.mjs";

import { v4 as uuidv4 } from "uuid"
import axios from "axios";

export const maxDuration = 300;

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, prompt, imageUrl, style, model } = await req.json();

  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');

  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: env.ACCESS_KEY_ID,
      secretAccessKey: env.SECRET_ACCESS_KEY,
    },
    region: "us-east-1",
  });

  const BUCKET_NAME = "pprcanvas";

  const imageId = uuidv4();

  try {
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: imageId,
        Body: Buffer.from(imageBase64!, "base64"),
        ContentEncoding: "base64",
        // Body: Buffer.from(imageUrl),
        ContentType: "image/gif",
      })
      .promise();

    // Construct the S3 URL
    const s3ImageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${imageId}`;

    // Update this part to include style and model
    const emote = await prisma.emote.create({
      data: {
        userId,
        prompt,
        imageUrl: s3ImageUrl, // Use the S3 URL
        style,  // Add the style field
        model,  // Add the model field
      },
    });

    return NextResponse.json(emote);
  } catch (error) {
    console.log('[SAVE_EMOTE_ERROR]', error);
    return new NextResponse("Failed to create emote", { status: 500 });
  }
}