"use client"


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { EmoteForSale } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

interface ListEmoteProps {
  emotesForSale: EmoteForSale | null;
}

export default function ListEmote({ emotesForSale }: ListEmoteProps) {

  const [watermarkedUrl, setWatermarkedUrl] = useState('');

  const handleWatermark = async () => {
  try {
    const response = await axios.post('/api/replicate/watermark', {
      image: emotesForSale?.imageUrl,
    });
    setWatermarkedUrl(response.data.output);
    toast.success('Watermark added successfully!');
  } catch (error) {
    console.error('Failed to add watermark:', error);
    toast.error('Failed to add watermark. Please try again.');
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
          <form className="grid gap-4">
            {/* <div className="grid gap-2">
              <Label htmlFor="emoteId">Emote ID</Label>
              <Input id="emoteId" placeholder="Enter a unique ID" type="text" />
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image</Label>
              {/* <Input id="imageUrl" placeholder="Enter the image URL" type="text" /> */}
              {/* <Card className="group"> */}
  <div className="flex flex-col items-center justify-center p-6 aspect-square">
    <Image
      alt="Emote"
      className="w-full h-full object-contain"
      height={128} // reduced size
      src={emotesForSale?.imageUrl || "/placeholder.png"}
      style={{
        aspectRatio: "128/128", // reduced size
        objectFit: "cover",
      }}
      width={128} // reduced size
    />
  </div>
  {/* Rest of your code */}

            </div>
            <div className="grid gap-2">
  <Label htmlFor="watermarkedUrl">Watermarked URL</Label>
  <div className="flex items-center space-x-2">
    <Input
      id="watermarkedUrl"
      value={watermarkedUrl}
      readOnly
      placeholder="Watermarked URL will appear here"
    />
    <Button onClick={handleWatermark} disabled={!emotesForSale?.imageUrl}>
      Add Watermark
    </Button>
  </div>
</div>
            <div className="grid gap-2">
              <Label htmlFor="prompt">Prompt</Label>
              <p>{emotesForSale?.prompt}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Enter the price (optional)" step="0.01" type="number" />
            </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="style">Style</Label>
              <Input id="style" placeholder="Enter the style (optional)" type="text" />
            </div> */}
            <Button type="submit">List Emote</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}