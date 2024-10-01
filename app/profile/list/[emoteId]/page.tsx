import React from 'react';
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

  if (!userId) {
    return <div>Please sign in to list emotes.</div>;
  }

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
    return <div>Emote not found or you dont have permission to list it.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List Your Emote</h1>
      <ListEmote emoteForSale={emote.emoteForSale} emote={emote} />
    </div>
  )
}

export default MarketplacePage