import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();
    const url = new URL(imageUrl);
    const bucketName = url.hostname.split('.')[0];
    const key = url.pathname.slice(1);

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return NextResponse.json({ presignedUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return new NextResponse("Error generating pre-signed URL", { status: 500 });
  }
}