import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";
import Marketplace from "./_components/marketplace";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 20;

const MarketplacePage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/signin');
  }

  const currentPage = Number(searchParams.page) || 1;

  const totalEmotes = await db.emoteForSale.count();
  const totalPages = Math.ceil(totalEmotes / ITEMS_PER_PAGE);

  const emotesForSale = await db.emoteForSale.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  // Fetch user's emotes
  const userEmotes = await db.emote.findMany({
    where: {
      userId: userId,
    },
    include: {
      emoteForSale: true,
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return (
    <Marketplace 
      initialEmotesForSale={emotesForSale}
      currentPage={currentPage}
      totalPages={totalPages}
      userEmotes={userEmotes}
    />
  )
}

export default MarketplacePage