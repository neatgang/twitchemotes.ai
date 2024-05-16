import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db";
import ListEmote from "../_components/list-emote";


const MarketplacePage = async () => {

const { userId } = auth();

const emotes = await db.emote.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    }
  });


    return (
        <>
            {/* <ListEmote /> */}
        </>
    )
}

export default MarketplacePage
