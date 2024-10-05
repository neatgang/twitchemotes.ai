import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";
import ListEmote from "../_components/list-emote";

const MarketplacePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>Please sign in to list emotes.</div>;
  }

  const emotes = await db.emote.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      emoteForSale: true,
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-4">List Your Emotes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emotes.map((emote) => (
          <ListEmote key={emote.id} emoteForSale={emote.emoteForSale} emote={emote} />
        ))}
      </div>
    </div>
  );
}

export default MarketplacePage