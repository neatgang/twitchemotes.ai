import { auth } from "@clerk/nextjs/server"

import { db } from "@/lib/db";
import Marketplace from "./_components/marketplace";

const ITEMS_PER_PAGE = 20; // Adjust this number as needed

const MarketplacePage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return null; // or redirect to login
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

  return (
    <Marketplace 
      emotesForSale={emotesForSale}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}

export default MarketplacePage