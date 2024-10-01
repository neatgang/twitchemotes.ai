"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Emote, EmoteForSale } from "@prisma/client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface EmoteHistoryProps {
  emotes: (Emote & { emoteForSale: EmoteForSale | null })[];
  userId: string;
}

const ITEMS_PER_PAGE = 8;

export const EmoteHistoryCard = ({ emotes, userId }: EmoteHistoryProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredEmotes = emotes.filter(emote => 
    emote.prompt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmotes.length / ITEMS_PER_PAGE);
  const paginatedEmotes = filteredEmotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, currentPage]);

  const handleEmoteAction = async (emote: Emote & { emoteForSale: EmoteForSale | null }) => {
    // ... (existing handleEmoteAction logic)
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-6">
      {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
        <Skeleton key={index} className="w-full aspect-square" />
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emote History</CardTitle>
        <CardDescription>View and manage your generated emotes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input 
          placeholder="Search emotes..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4"
        />
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-6">
            {paginatedEmotes.map((emote) => (
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
        )}
        <div className="mt-6 flex justify-between items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};