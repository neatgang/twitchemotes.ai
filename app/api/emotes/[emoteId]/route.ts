import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { emoteId: string } }
) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const emote = await db.emote.findUnique({
      where: {
        id: params.emoteId,
        userId: userId,
      },
      include: {
        emoteForSale: true,
      }
    });

    if (!emote) {
      return NextResponse.json({ error: 'Emote not found' }, { status: 404 });
    }

    return NextResponse.json({ emote });
  } catch (error) {
    console.error('Failed to fetch emote:', error);
    return NextResponse.json({ error: 'Failed to fetch emote' }, { status: 500 });
  }
}
