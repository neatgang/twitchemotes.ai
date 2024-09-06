"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { EmoteForSale, Emote } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { getUser } from "@/actions/get-user";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"; // Make sure to import the cn utility

interface MarketplaceProps {
  initialEmotesForSale: EmoteForSale[];
  userEmotes: (Emote & { emoteForSale: EmoteForSale | null })[];
  userId: string;
}

const ITEMS_PER_PAGE = 20;

export default function Marketplace({ initialEmotesForSale, userEmotes, userId }: MarketplaceProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredEmotes = useMemo(() => {
    return initialEmotesForSale.filter(emote => 
      emote.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialEmotesForSale, searchTerm]);

  const totalPages = Math.ceil(filteredEmotes.length / ITEMS_PER_PAGE);

  const paginatedEmotes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmotes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmotes, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  const handleEmoteAction = async (emote: Emote & { emoteForSale: EmoteForSale | null }) => {
    if (emote.emoteForSale) {
      router.push(`/emote/${emote.id}`);
    } else {
      const user = await getUser({ userId });
      if (!user?.name) {
        toast({
          title: "Profile Incomplete",
          description: "Please set up your username in your profile before listing an emote.",
          variant: "destructive"
        });
        return;
      }
      
      try {
        setLoading(true);
        const response = await axios.post('/api/sell-emote', { emoteId: emote.id });
        toast({
          title: "Success",
          description: "Emote listed for sale",
        });
        router.push(`/emote/${response.data.id}`);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to list emote",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

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
                    {userEmotes.map((emote) => (
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
                            handleEmoteAction(emote);
                          }}
                        >
                          {emote.emoteForSale ? 'View Listing' : 'Add to Listing'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {paginatedEmotes.map((emote) => (
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
          
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(index + 1);
                    }}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </main>
  );
}