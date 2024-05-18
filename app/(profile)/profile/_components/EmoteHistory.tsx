"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Emote } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface EmoteHistoryProps {
  emotes: Emote[];
}

export const EmoteHistoryCard = ({ emotes }: EmoteHistoryProps) => {
  const [selectedEmote, setSelectedEmote] = useState<Emote | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emote History</CardTitle>
        <CardDescription>View and manage your generated emotes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {emotes.map((emote) => (
            <div key={emote.id} onClick={() => setSelectedEmote(emote)} className="cursor-pointer">
              <Image
                alt="Emote"
                className="rounded-md"
                src={emote.imageUrl || "/placeholder.svg"}
                width={128}
                height={128}
                style={{ aspectRatio: "1", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View All</Button>
      </CardFooter>
    </Card>
  );
};