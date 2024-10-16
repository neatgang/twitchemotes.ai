"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Emote, EmoteForSale } from "@prisma/client";
import axios from "axios";
import { CoinsIcon, Download, HomeIcon, List, ListPlus, ListTodo, PlusIcon, Settings2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ProfileCard } from "./ProfileCard";
import { SocialLinksCard } from "./SocialLinks";

interface ProfileEmotesProps {
    emotes: (Emote & { EmoteForSale?: EmoteForSale | null })[];
  }

  export default function ProfileEmotes({ emotes }: ProfileEmotesProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    const sellEmote = async (emote: Emote) => {
      try {
        setIsLoading(true);
        await axios.post('/api/sell-emote', { 
          emoteId: emote.id,
          style: emote.style,
          model: emote.model
        });
        toast.success("Emote listed");
        router.push("/showcase");
      } catch {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold md:text-3xl">Your Emotes</h1>
              <p className="text-gray-500 dark:text-gray-400">View and manage the emotes you&apos;ve generated.</p>
            </div>
            <Link href="/emotes">
            <Button variant="outline">
              <PlusIcon className="mr-2 h-4 w-4" />
              Generate New Emote
            </Button>
            </Link>
          </div>
        </header>
        {/* <ProfileCard /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {emotes.map((emote) => (
            <Card key={emote.id} className="group">
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                <Image
                  alt="Emote"
                  className="w-full h-full object-contain"
                  height={128}
                  src={emote.imageUrl || "/placeholder.png"} // replace with the actual image property of the emote
                  style={{
                    aspectRatio: "128/128",
                    objectFit: "cover",
                  }}
                  width={128}
                />
              </CardContent>
              <CardFooter className="pt-4">
                <div className="flex flex-col items-start">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Prompt: {emote.prompt}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Style: {emote.style || 'Not specified'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Model: {emote.model || 'Not specified'}
                  </p>
                  <div className="mt-2">
                    <Button onClick={() => window.open(emote.imageUrl || '')} variant="secondary" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    {!emote.EmoteForSale ? (
                      <Button onClick={() => sellEmote(emote)} variant="default" className="w-full mt-2">
                        <ListPlus className="h-4 w-4 mr-2" />
                        List Emote
                      </Button>
                    ) : (
                      <Button onClick={() => router.push(`/profile/list/${emote.id}`)} variant="default" className="w-full mt-2">
                        <Settings2Icon className="h-4 w-4 mr-2" />
                        Edit Listing
                      </Button>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    )
  }
