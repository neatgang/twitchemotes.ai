"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { EmoteForSale } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { addEmoteToLibrary } from "@/actions/addEmoteToLibrary";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface MarketplaceProps {
  emotesForSale: EmoteForSale[];
  currentPage: number;
  totalPages: number;
}

export default function Marketplace({ emotesForSale, currentPage, totalPages }: MarketplaceProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const handlePageChange = (page: number) => {
    router.push(`/showcase?page=${page}`);
  };

  const handleAddToLibrary = async (emote: EmoteForSale) => {
    setIsLoading(prev => ({ ...prev, [emote.id]: true }));
    try {
      const result = await addEmoteToLibrary({
        prompt: emote.prompt,
        imageUrl: emote.imageUrl,
        style: emote.style || 'custom' // Use the emote's style if available, otherwise default to 'custom'
      });
      if (result.success) {
        toast.success('Emote added to your library!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error('Failed to add emote to library');
    } finally {
      setIsLoading(prev => ({ ...prev, [emote.id]: false }));
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold md:text-3xl">Emote Showcase</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Browse unique emotes created by other users.
            </p>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {emotesForSale.map((emote) => (
          <Card key={emote.id}>
            <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
              <Image
                alt={emote.prompt}
                className="w-full h-full object-contain"
                height={128}
                src={emote.imageUrl}
                style={{
                  aspectRatio: "128/128",
                  objectFit: "cover",
                }}
                width={128}
              />
            </CardContent>
            <CardFooter className="pt-4 flex-col">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{emote.prompt}</p>
              </div>
              <Button 
                onClick={() => handleAddToLibrary(emote)} 
                className="mt-2 w-full flex" 
                variant="outline"
                disabled={isLoading[emote.id]}
              >
                {isLoading[emote.id] ? 'Adding...' : 'Add to Library'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                href="#" 
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}