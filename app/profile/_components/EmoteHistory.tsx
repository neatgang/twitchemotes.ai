"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Emote, EmoteForSale } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface EmoteHistoryProps {
  emotes: (Emote & { emoteForSale: EmoteForSale | null })[];
  userId: string;
}

export const EmoteHistoryCard = ({ emotes, userId }: EmoteHistoryProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmoteAction = async (emote: Emote & { emoteForSale: EmoteForSale | null }) => {
    if (emote.emoteForSale) {
      router.push(`/emote/${emote.id}`);
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post('/api/sell-emote', { emoteId: emote.id });
        toast({
          title: "Success",
          description: "Emote listed for sale",
        });
        router.push(`/emote/${response.data.id}`);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to list emote",
          variant: "destructive"
        });
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {emotes.map((emote) => (
            <Card key={emote.id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    alt={emote.prompt || "Emote"}
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    src={emote.imageUrl || "/placeholder.svg"}
                    layout="fill"
                  />
                </div>
                <h3 className="font-medium text-sm truncate">{emote.prompt || "Untitled Emote"}</h3>
                <Button 
                  onClick={() => handleEmoteAction(emote)} 
                  variant="outline" 
                  className="mt-2 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : emote.emoteForSale ? "View Listing" : "List Emote"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};