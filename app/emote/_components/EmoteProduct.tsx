"use client"

import { addEmoteToLibrary } from "@/actions/addEmoteToLibrary";
import { Button } from "@/components/ui/button";
import { Emote, EmoteForSale } from "@prisma/client";
import Image from "next/image";
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
    <article className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col items-center justify-center">
          <figure className="relative w-full rounded-lg overflow-hidden">
            <Image
              alt={`${emoteListing?.prompt} emote`}
              className="w-full rounded-lg object-cover"
              height={400}
              loading="eager"
              src={emoteListing?.watermarkedUrl || emoteListing?.imageUrl || ''}
              width={400}
            />
            <figcaption className="sr-only">{emoteListing?.prompt} emote</figcaption>
          </figure>
        </div>
        <div className="space-y-6">
          <header>
            <h1 className="text-3xl font-bold">{emoteListing?.prompt}</h1>
            {/* <p className="text-gray-500 dark:text-gray-400 mt-2">
              A unique {emoteStyle} style emote created with {emoteModel}
            </p> */}
          </header>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">Style</dt>
              <dd className="font-medium">{emoteStyle}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">Created with</dt>
              <dd className="font-medium">{emoteModel}</dd>
            </div>
          </dl>
          <Button 
            onClick={handleAddToLibrary} 
            className="mt-2 w-full flex" 
            variant="default"
            disabled={isLoading || !emoteListing}
            aria-label={isLoading ? 'Adding to library...' : 'Add to Library'}
          >
            {isLoading ? 'Adding...' : 'Add to Library'}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default EmoteProduct;