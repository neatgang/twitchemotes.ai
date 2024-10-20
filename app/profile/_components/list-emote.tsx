"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Emote, EmoteForSale } from "@prisma/client"
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Watermark from '@uiw/react-watermark'
import { AxiosError } from 'axios';
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ListEmoteProps {
  emotes: Emote[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ListEmote({ emotes, totalPages, currentPage, onPageChange }: ListEmoteProps) {
  const router = useRouter();
  const [selectedEmote, setSelectedEmote] = useState<Emote | null>(null);
  const [watermarkedUrl, setWatermarkedUrl] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWatermark = async () => {
    if (!selectedEmote) return;
    setIsLoading(true);
    try {
      const response = await axios.post('/api/emotes/watermark', {
        emoteId: selectedEmote.id,
        imageUrl: selectedEmote.imageUrl,
      }, {
        responseType: 'arraybuffer'
      });

      const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');

      const uploadResponse = await axios.post('/api/emotes/watermark/upload-watermark', {
        imageBase64,
        emoteId: selectedEmote.id,
      });

      console.log('Upload response:', uploadResponse.data); // Add this line for debugging

      if (uploadResponse.data.watermarkedUrl) {
        setWatermarkedUrl(uploadResponse.data.watermarkedUrl);
        toast.success('Watermark added and uploaded successfully!');
      } else {
        throw new Error('Failed to get watermarked URL');
      }
    } catch (error) {
      console.error('Failed to add watermark:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data); // Add this line for debugging
        toast.error(error.response?.data?.error || 'Failed to add watermark. Please try again.');
      } else if (error instanceof Error) {
        toast.error(error.message || 'Failed to add watermark. Please try again.');
      } else {
        toast.error('An unknown error occurred while adding watermark. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmote) return;
    setIsLoading(true);

    try {
      const response = await axios.post('/api/stripe/list-emote', {
        emoteId: selectedEmote.id,
        price: parseFloat(price),
        watermarkedUrl: watermarkedUrl,
      });

      if (response.data.success) {
        toast.success("Emote listed successfully!");
        router.push('/profile');
      } else {
        throw new Error(response.data.error || "Failed to list emote");
      }
    } catch (error) {
      console.error('Failed to list emote:', error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Failed to list emote. Please try again.');
      } else if (error instanceof Error) {
        toast.error(error.message || 'Failed to list emote. Please try again.');
      } else {
        toast.error('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card>
        <CardContent className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {emotes.map((emote) => (
              <div 
                key={emote.id} 
                className={`relative cursor-pointer ${selectedEmote?.id === emote.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedEmote(emote)}
              >
                <Image
                  src={emote.imageUrl || "/placeholder.png"}
                  alt={emote.prompt || "Emote"}
                  width={100}
                  height={100}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

          {selectedEmote && (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex flex-col items-center justify-center p-6 aspect-square">
                  <Image
                    alt="Selected Emote"
                    className="w-full h-full object-contain"
                    height={128}
                    src={watermarkedUrl || selectedEmote.imageUrl || "/placeholder.png"}
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
                <p>{selectedEmote.prompt}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price (minimum $1.00)</Label>
                <Input 
                  id="price" 
                  placeholder="Enter the price" 
                  step="0.01" 
                  type="number"
                  min="1.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" disabled={isLoading || !watermarkedUrl}>
                {isLoading ? "Listing..." : "List Emote"}
              </Button>
            </form>
          )}
          
          {/* Pagination controls */}
          <div className="mt-6 flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
