'use client'

import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/FileUpload"
import Image from "next/image"
import { Emote } from "@prisma/client"
import { useState } from "react"
import { X } from "lucide-react" // Import X icon for remove button
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { TrainingStatus } from "../../types/training"

// Add this type definition


interface TrainingImagesProps {
  emotes: Emote[];
  images: string[];
  onFileChange: (url?: string) => void;
  onEmoteSelect: (imageUrl: string) => void;
  onClearImages: () => void; // New prop for clearing all images
  onRemoveImage: (index: number) => void; // New prop for removing a single image
  trainingResult: any;
  userId?: string;
  trainingStatus: TrainingStatus;
}

export default function TrainingImages({ 
  emotes, 
  images, 
  onFileChange, 
  onEmoteSelect, 
  onClearImages, 
  onRemoveImage,
  trainingResult, 
  userId, 
  trainingStatus 
}: TrainingImagesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const emotesPerPage = 16;
  const totalPages = Math.ceil(emotes.length / emotesPerPage);

  const getCurrentEmotes = () => {
    const startIndex = (currentPage - 1) * emotesPerPage;
    const endIndex = startIndex + emotesPerPage;
    return emotes.slice(startIndex, endIndex);
  };

  return (
    <div className="w-full lg:w-3/4">
      <h2 className="text-xl font-bold mb-4">Your Emotes</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2">
        {getCurrentEmotes().map((emote: Emote) => (
          <div 
            key={emote.id} 
            className="aspect-square relative group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border cursor-pointer"
            onClick={() => onEmoteSelect(emote.imageUrl!)}
          >
            <Image
              fill
              src={emote.imageUrl!}
              alt={emote.id}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
          </PaginationItem>
          <PaginationItem className="text-black">
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <h2 className="text-xl font-bold my-4">Training Images</h2>
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <p>Dataset: {images.length} image{images.length !== 1 ? 's' : ''}</p>
          <Button variant="destructive" onClick={onClearImages}>Clear All Images</Button>
        </div>
        <div className="h-4 bg-[#242424] rounded-full mt-2">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${images.length / 15 * 100}%` }}></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Min: 5</span>
          <span>Max: 15</span>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <div key={index} className="col-span-1 relative group">
              <Image src={image} alt={`Uploaded ${index + 1}`} className="object-cover" width={1000} height={1000}/>
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => typeof onRemoveImage === 'function' ? onRemoveImage(index) : console.error('onRemoveImage is not a function')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Image URLs:</h3>
          <ul className="list-disc pl-5">
            {images.map((image, index) => (
              <li key={index}>
                <a href={image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {image}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {trainingResult && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">Training Result</h3>
          <pre>{JSON.stringify(trainingResult, null, 2)}</pre>
        </div>
      )}
      {trainingStatus !== 'IDLE' && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Training Status: {trainingStatus}</h3>
          {trainingStatus === 'IN_PROGRESS' && <p>Training is in progress. This may take a while...</p>}
          {trainingStatus === 'QUEUED' && <p>Training job is queued. Please wait...</p>}
        </div>
      )}
    </div>
  )
}