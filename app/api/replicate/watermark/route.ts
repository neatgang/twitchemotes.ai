import { addWatermark } from '@/lib/Watermark';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image } = body;

    // Validate input
    if (!image) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    const watermarkedBuffer = await addWatermark(image, 'EMOTEMAKER.AI');
    const watermarkedBase64 = watermarkedBuffer.toString('base64');

    return NextResponse.json({ output: `data:image/png;base64,${watermarkedBase64}` });
  } catch (error) {
    console.log('[WATERMARK_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}