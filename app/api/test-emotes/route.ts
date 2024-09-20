import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export async function GET() {
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentEmotes = await prisma.emoteForSale.findMany({
      where: {
        createdAt: {
          gte: twentyFourHoursAgo
        }
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 15
    });

    const totalEmotes = await prisma.emoteForSale.count();

    const allStatuses = await prisma.emoteForSale.groupBy({
      by: ['status'],
      _count: true
    });

    const oldestEmote = await prisma.emoteForSale.findFirst({
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json({
      recentEmotes,
      totalEmotes,
      statusCounts: allStatuses,
      oldestEmoteDate: oldestEmote?.createdAt,
      queryStartDate: twentyFourHoursAgo,
      currentDate: now
    });
  } catch (error) {
    console.error('Error fetching emotes:', error);
    return NextResponse.json({ error: 'Failed to fetch emotes', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}