import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";
import Marketplace from "./_components/marketplace";
import { redirect } from "next/navigation";
import { getEmotesForSale } from "@/actions/get-emotes-for-sale";

const MarketplacePage = async () => {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/signin');
  }

  const { emotesForSale } = await getEmotesForSale();

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
      userEmotes={userEmotes}
      userId={userId}
    />
  )
}

export default MarketplacePage