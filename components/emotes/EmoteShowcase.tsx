import { useEffect, useState } from "react";
import { getEmotes } from "@/actions/get-emotes";
import { EmoteCard } from "./EmoteCard";

type Emote = {
  id: string;
  prompt: string | null;
  imageUrl: string | null;
  userId: string | null;
  createdAt: Date;
};

const EmoteShowcase = async () => {

  const emotes = await getEmotes();

  return (
    <div className="flex flex-col items-center space-y-4 text-center mt-8">
        <h2 className="text-3xl font-bold tracking-tighter text-gray-800 dark:text-white pb-6">
            Emote Showcase!
        </h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-4">
      {emotes.map((emote) => (
        <EmoteCard
          key={emote.id}
          id={emote.id}
          imageUrl={emote.imageUrl || ""}
          prompt={emote.prompt}
        />
      ))}
      {emotes.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No emotes found
        </div>
      )}
    </div>
    </div>
  );
}

export default EmoteShowcase;

