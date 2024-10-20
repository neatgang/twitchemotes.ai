"use client"

import { Button } from "@/components/ui/button";
import { Emote, EmoteForSale } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { addEmoteToLibrary } from "@/actions/addEmoteToLibrary";

interface EmoteProductProps {
  emoteListing: EmoteForSale & { emote: Emote };
  emoteStyle?: string;
  emoteModel?: string;
}

const EmoteProduct: React.FC<EmoteProductProps> = ({ emoteListing, emoteStyle, emoteModel }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const isForSale = emoteListing.price !== null;

  const handleAction = async () => {
    setIsLoading(true);
    if (isForSale) {
      try {
        const response = await axios.get(`/api/stripe/purchase-emote?emoteId=${emoteListing.id}`);
        window.location.href = response.data.url;
      } catch (error) {
        console.error('Purchase error:', error);
        if (axios.isAxiosError(error)) {
          toast.error(`Failed to initiate purchase: ${error.response?.data?.error || error.message}`);
        } else if (error instanceof Error) {
          toast.error(`Failed to initiate purchase: ${error.message}`);
        } else {
          toast.error('An unknown error occurred');
        }
      }
    } else {
      try {
        const result = await addEmoteToLibrary({
          prompt: emoteListing.emote.prompt || '',
          imageUrl: emoteListing.emote.imageUrl || '',
          style: emoteListing.emote.style || '',
        });
        
        if (result.success) {
          toast.success('Emote added to your library');
          router.push('/profile'); // Or wherever you want to redirect after adding
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Add to library error:', error);
        toast.error('Failed to add emote to your library');
      }
    }
    setIsLoading(false);
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
            {isForSale && (
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Price</dt>
                <dd className="font-medium">
                  ${emoteListing.price !== null ? emoteListing.price.toFixed(2) : 'N/A'}
                </dd>
              </div>
            )}
          </dl>
          <Button 
            onClick={handleAction} 
            className="mt-2 w-full flex" 
            variant="default"
            disabled={isLoading}
            aria-label={isLoading ? 'Processing...' : (isForSale ? 'Purchase Emote' : 'Add Emote')}
          >
            {isLoading ? 'Processing...' : (isForSale ? 'Purchase Emote' : 'Add Emote')}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default EmoteProduct;
