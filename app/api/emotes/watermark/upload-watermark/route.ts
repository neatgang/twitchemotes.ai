import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import AWS from "aws-sdk";
import { env } from "@/env.mjs";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { imageBase64, emoteId } = await req.json();

        if (!imageBase64 || !emoteId) {
            return new NextResponse("Image data and Emote ID are required", { status: 400 });
        }

        const s3 = new AWS.S3({
            credentials: {
                accessKeyId: env.ACCESS_KEY_ID,
                secretAccessKey: env.SECRET_ACCESS_KEY,
            },
            region: "us-east-1",
        });

        const BUCKET_NAME = "pprcanvas";
        const imageId = uuidv4();

        await s3
            .putObject({
                Bucket: BUCKET_NAME,
                Key: imageId,
                Body: Buffer.from(imageBase64, 'base64'),
                ContentEncoding: 'base64',
                ContentType: 'image/png',
            })
            .promise();

        const watermarkedUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${imageId}`;

        // Fetch the original Emote to get required fields
        const originalEmote = await db.emote.findUnique({
            where: { id: emoteId },
        });

        if (!originalEmote) {
            return new NextResponse("Emote not found", { status: 404 });
        }

        if (!originalEmote.imageUrl || !originalEmote.prompt) {
            return new NextResponse("Emote is missing required fields", { status: 400 });
        }

        // Update the EmoteForSale record with the watermarked URL
        const updatedEmote = await db.emoteForSale.upsert({
            where: { emoteId },
            update: { watermarkedUrl },
            create: {
                watermarkedUrl,
                imageUrl: originalEmote.imageUrl,
                prompt: originalEmote.prompt,
                emote: { connect: { id: emoteId } },
                price: 0, // Set a default price
                style: originalEmote.style ?? "",
                model: originalEmote.model ?? "",
                user: { connect: { id: userId } },
            },
        });

        return NextResponse.json({ watermarkedUrl: updatedEmote.watermarkedUrl });
    } catch (error: unknown) {
        console.error('[UPLOAD_WATERMARK_ERROR]', error);
        
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        
        return new NextResponse(JSON.stringify({ error: errorMessage }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}