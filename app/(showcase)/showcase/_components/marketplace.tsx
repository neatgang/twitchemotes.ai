"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { EmoteForSale } from "@prisma/client";
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
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import axios from "axios";

interface MarketplaceProps {
  initialEmotesForSale: EmoteForSale[];
  currentPage: number;
  totalPages: number;
}

export default function Marketplace({ initialEmotesForSale, currentPage, totalPages }: MarketplaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [emotesForSale, setEmotesForSale] = useState(initialEmotesForSale);
  const [loading, setLoading] = useState(false);
  // const [filter, setFilter] = useState("all");

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
            {/* <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="animals">Animals</SelectItem>
                <SelectItem value="emotions">Emotions</SelectItem>
                <SelectItem value="characters">Characters</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </div>
      </header>
      {loading ? (
        <p>Loading...</p>
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