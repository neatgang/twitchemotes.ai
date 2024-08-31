"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { EmoteForSale, Emote } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmoteHistoryCard } from "@/app/profile/_components/EmoteHistory";
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

interface MarketplaceProps {
  initialEmotesForSale: EmoteForSale[];
  currentPage: number;
  totalPages: number;
  userEmotes: (Emote & { emoteForSale: EmoteForSale | null })[];
}

export default function Marketplace({ initialEmotesForSale, currentPage, totalPages, userEmotes }: MarketplaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [emotesForSale, setEmotesForSale] = useState(initialEmotesForSale);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userEmotesPage, setUserEmotesPage] = useState(1);
  const userEmotesPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmotes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/emotes`, {
          params: {
            page: currentPage,
            search: searchTerm,
            // filter,
          },
        });
        setEmotesForSale(response.data.emotes);
      } catch (error) {
        console.error("Failed to fetch emotes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmotes();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    router.push(`/showcase?page=${page}&search=${searchTerm}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    router.push(`/showcase?page=1&search=${e.target.value}`);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {[...Array(10)].map((_, index) => (
        <Card key={index} className="group">
          <CardContent className="p-4">
            <Skeleton className="aspect-square w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const paginatedUserEmotes = userEmotes.slice(
    (userEmotesPage - 1) * userEmotesPerPage,
    userEmotesPage * userEmotesPerPage
  );

  const userEmotesTotalPages = Math.ceil(userEmotes.length / userEmotesPerPage);

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold md:text-3xl">Emote Showcase</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Browse unique emotes created by other users.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Input 
              placeholder="Search emotes..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="max-w-xs"
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">Add Emote</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>My Emotes</DialogTitle>
                  <DialogDescription>
                    View and manage your created emotes.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[300px] mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {paginatedUserEmotes.map((emote) => (
                      <div key={emote.id} className="flex flex-col items-center">
                        <div className="relative w-24 h-24 mb-2">
                          <Image
                            src={emote.imageUrl || '/placeholder-image.jpg'}
                            alt={emote.prompt || 'Emote image'}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                        <p className="text-xs text-center truncate w-full">{emote.prompt || 'Untitled Emote'}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => {
                            // Replace console.log with toast
                            toast({
                              title: emote.emoteForSale ? "Viewing Listing" : "Adding to Listing",
                              description: `Emote ID: ${emote.id}`,
                            })
                            // Implement the logic to add to listing or view listing here
                          }}
                        >
                          {emote.emoteForSale ? 'View Listing' : 'Add to Listing'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setUserEmotesPage(prev => Math.max(prev - 1, 1))}
                        className={userEmotesPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <span className="text-sm">
                        Page {userEmotesPage} of {userEmotesTotalPages}
                      </span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setUserEmotesPage(prev => Math.min(prev + 1, userEmotesTotalPages))}
                        className={userEmotesPage === userEmotesTotalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {emotesForSale.map((emote) => (
            <Card key={emote.id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    alt={emote.prompt}
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    src={emote.imageUrl}
                    layout="fill"
                  />
                </div>
                <h3 className="font-medium text-sm truncate">{emote.prompt}</h3>
                {/* <p className="text-xs text-gray-500">by {emote.userId}</p> */}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/emote/${emote.id}`} passHref className="w-full">
                  <Button className="w-full" variant="outline">
                    View Emote
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Pagination className="mt-8 mx-auto">
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