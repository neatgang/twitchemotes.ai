"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Emote } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EmoteHistoryProps {
  emotes: Emote[];
}

export const GuidesForGamersCTA = () => {
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
        <CardTitle>Do you make educational content to help gamers level up?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
        <CardDescription>If so, you&apos;ll love our sister site, GuidesForGamers.com! It&apos;s the go-to destination for in-depth guides, tutorials, and resources that help gamers master their favorite games.</CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="https://guidesforgamers.com">
          <Button variant="outline">Submit a Guide</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};