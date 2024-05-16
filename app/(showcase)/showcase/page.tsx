import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db";
import Marketplace from "./_components/marketplace";

const MarketplacePage = async () => {

const { userId } = auth();

const emotesForSale = await db.emoteForSale.findMany({
    orderBy: {
      createdAt: "desc",
    }
  });


    return (
        <>
        <Marketplace emotesForSale={emotesForSale}/>
        </>
    )
}

export default MarketplacePage
