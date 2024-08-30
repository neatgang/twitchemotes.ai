"use client"

import { addEmoteToLibrary } from "@/actions/addEmoteToLibrary";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Emote, EmoteForSale } from "@prisma/client";
import { CheckIcon, StarIcon, ZoomInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface EmoteProductProps {
  emoteListing: EmoteForSale & { emote: Emote };
  emoteStyle?: string;
  emoteModel?: string;
}

const EmoteProduct: React.FC<EmoteProductProps> = ({ emoteListing, emoteStyle, emoteModel }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddToLibrary = async () => {
    if (!emoteListing) return;
    setIsLoading(true);
    try {
      const result = await addEmoteToLibrary({
        prompt: emoteListing.prompt,
        imageUrl: emoteListing.imageUrl,
        style: emoteListing.style || 'custom'
      });
      if (result.success) {
        toast.success('Emote added to your library!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error('Failed to add emote to library');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full rounded-lg overflow-hidden">
            <Image
              alt={emoteListing?.prompt || ''}
              className="w-full rounded-lg object-cover"
              decoding="async"
              height={800}
              loading="lazy"
              src={emoteListing?.imageUrl || ''}
              width={800}
            />
          </div>
          <div className="w-full aspect-video rounded-lg overflow-hidden mt-6">
            <span className="w-full h-full object-cover rounded-md bg-muted" />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{emoteListing?.prompt}</h1>
            <p className="text-gray-500 dark:text-gray-400">
            </p>
            <div className="mt-4 space-y-4">
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Style</div>
              <div className="font-medium">{emoteStyle}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Created with</div>
              <div className="font-medium">{emoteModel}</div>
            </div>
          </div>
          <Button 
            onClick={handleAddToLibrary} 
            className="mt-2 w-full flex" 
            variant="default"
            disabled={isLoading || !emoteListing}
          >
            {isLoading ? 'Adding...' : 'Add to Library'}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default EmoteProduct;