import { auth } from "@clerk/nextjs/server"

import { db } from "@/lib/db";
import ListEmote from "../../_components/list-emote";

const MarketplacePage = async ({
  params,
}: {
  params: {
      emoteId: string;
  };
}) => {

const { userId } = auth();

const emoteForSale = await db.emoteForSale.findUnique({
    where: {
      emoteId: params.emoteId,
      // userId?: userId
    },
    // orderBy: {
    //   createdAt: "desc",
    // }
  });


    return (
        <>
            <ListEmote emotesForSale={emoteForSale}/>
        </>
    )
}

export default MarketplacePage
