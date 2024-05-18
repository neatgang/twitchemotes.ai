"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Emote } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EmoteHistoryProps {
  emotes: Emote[];
}

export const EmoteHistoryCard = ({ emotes }: EmoteHistoryProps) => {
  const [selectedEmote, setSelectedEmote] = useState<Emote | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const sellEmote = async (emoteId: string) => {
    try {
      setIsLoading(true);
      await axios.post('/api/sell-emote', { emoteId });
      toast.success("Emote listed for sale");
      router.push("/showcase");
    } catch (error) {
      toast.error("Failed to list emote: ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emote History</CardTitle>
        <CardDescription>View and manage your generated emotes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
              <Button onClick={() => sellEmote(emote.id)} variant="outline" className="mt-2">
                List Emote
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button variant="outline">View All</Button>
      </CardFooter> */}
    </Card>
  );
};