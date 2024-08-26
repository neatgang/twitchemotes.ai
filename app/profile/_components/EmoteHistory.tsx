"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Emote, EmoteForSale } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EmoteHistoryProps {
  emotes: (Emote & { emoteForSale: EmoteForSale | null })[];
}

export const EmoteHistoryCard = ({ emotes }: EmoteHistoryProps) => {
  const [selectedEmote, setSelectedEmote] = useState<Emote | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmoteAction = async (emote: Emote & { emoteForSale: EmoteForSale | null }) => {
    if (emote.emoteForSale) {
      // If the emote is already listed, redirect to the emote page
      router.push(`/emote/${emote.id}`);
    } else {
      // If the emote is not listed, proceed with listing it
      try {
        setIsLoading(true);
        const response = await axios.post('/api/sell-emote', { emoteId: emote.id });
        toast.success("Emote listed for sale");
        // Redirect to the newly created emote listing page
        router.push(`/emote/${response.data.id}`);
      } catch (error) {
        toast.error("Failed to list emote");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emote History</CardTitle>
        <CardDescription>View and manage your generated emotes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
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
              <Button 
                onClick={() => handleEmoteAction(emote)} 
                variant="outline" 
                className="mt-2 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : emote.emoteForSale ? "View Listing" : "List Emote"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};