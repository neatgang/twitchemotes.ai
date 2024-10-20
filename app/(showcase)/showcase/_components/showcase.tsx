"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Emote } from "@prisma/client";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";

interface ShowcaseProps {
  initialEmotes: Emote[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
}

export default function Showcase({ 
  initialEmotes, 
  currentPage, 
  totalPages, 
  totalCount,
  itemsPerPage
}: ShowcaseProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Fallback timer
    return () => clearTimeout(timer);
  }, [initialEmotes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    router.push(`/showcase?page=1&search=${encodeURIComponent(newSearchTerm)}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/showcase?page=${page}&search=${encodeURIComponent(searchTerm)}`);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {[...Array(20)].map((_, index) => (
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

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold md:text-3xl">Emote Showcase</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Browse all emotes created by our users.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Input 
              placeholder="Search emotes..." 
              value={searchTerm}
              onChange={handleSearchChange} 
              className="max-w-xs"
            />
          </div>
        </div>
      </header>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {initialEmotes.map((emote) => (
              <Card key={emote.id} className="group hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                    <Image
                      alt={emote.prompt || "Emote"}
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      src={emote.imageUrl || '/placeholder-image.jpg'}
                      width={300}
                      height={300}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-medium text-sm truncate">{emote.prompt || "Untitled Emote"}</h3>
                  <p className="text-xs text-gray-500">{emote.style || "No style specified"}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/emote/${emote.id}`} passHref className="w-full">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 flex flex-col items-center space-y-4">
            <Pagination>
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
                {[...Array(totalPages)].map((_, index) => {
                  if (index === 0 || index === totalPages - 1 || (index >= currentPage - 2 && index <= currentPage + 2)) {
                    return (
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
                    );
                  } else if (index === currentPage - 3 || index === currentPage + 3) {
                    return <PaginationEllipsis key={index} />;
                  }
                  return null;
                })}
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
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalCount)} - {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} emotes
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
