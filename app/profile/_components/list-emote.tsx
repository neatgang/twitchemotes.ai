"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Emote, EmoteForSale } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Watermark from '@uiw/react-watermark'

interface ListEmoteProps {
  emote: Emote;
  emoteForSale: EmoteForSale | null;
}

export default function ListEmote({ emote, emoteForSale }: ListEmoteProps) {
  const router = useRouter();
  const [watermarkedUrl, setWatermarkedUrl] = useState(emoteForSale?.watermarkedUrl || '');
  const [price, setPrice] = useState(emoteForSale?.price?.toString() || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleWatermark = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/emotes/watermark', {
        emoteId: emote.id,
        imageUrl: emote.imageUrl,
      }, {
        responseType: 'arraybuffer'
      });

      const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');

      const uploadResponse = await axios.post('/api/emotes/watermark/upload-watermark', {
        imageBase64,
        emoteId: emote.id,
      });

      setWatermarkedUrl(uploadResponse.data.watermarkedUrl);
      toast.success('Watermark added and uploaded successfully!');
    } catch (error) {
      console.error('Failed to add watermark:', error);
      toast.error('Failed to add watermark. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/stripe/list-emote', {
        emoteId: emote.id,
        price: parseFloat(price),
      });

      if (response.data.success) {
        toast.success("Emote listed successfully!");
        router.push('/profile');
      }
    } catch (error) {
      console.error('Failed to list emote:', error);
      toast.error('Failed to list emote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold md:text-3xl">List an Emote</h1>
            <p className="text-gray-500 dark:text-gray-400">Fill out the form to list your emote on the marketplace.</p>
          </div>
        </div>
      </header>
      <Card>
        <CardContent className="mt-8">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image</Label>
              <div className="flex flex-col items-center justify-center p-6 aspect-square">
                <Image
                  alt="Emote"
                  className="w-full h-full object-contain"
                  height={128}
                  src={watermarkedUrl || emote.imageUrl || "/placeholder.png"}
                  style={{
                    aspectRatio: "128/128",
                    objectFit: "cover",
                  }}
                  width={128}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="watermarkedUrl">Watermark</Label>
              <div className="flex items-center space-x-2">
                <Button type="button" onClick={handleWatermark} disabled={isLoading || !!watermarkedUrl}>
                  {watermarkedUrl ? "Watermark Added" : "Add Watermark"}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="prompt">Prompt</Label>
              <p>{emote.prompt}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                placeholder="Enter the price" 
                step="0.01" 
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" disabled={isLoading || !watermarkedUrl}>
              {isLoading ? "Listing..." : "List Emote"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}