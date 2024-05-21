"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Emote } from "@prisma/client"; // Assuming you have an Emote type

interface ImagePreviewProps {
  initialEmote?: Emote;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ initialEmote }) => {
  const [selectedEmote, setSelectedEmote] = useState<Emote | undefined>(initialEmote);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 flex flex-col gap-4">
      <h2 className="text-lg font-bold">Image Preview</h2>
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        <Image
          alt="Emote Preview"
          className="w-full h-full object-cover"
          src={selectedEmote?.imageUrl || "/placeholder.svg"}
          height={640}
          width={640}
        />
      </div>
      <Button size="sm" variant="outline" onClick={() => setSelectedEmote(undefined)}>
        <TrashIcon className="w-4 h-4 mr-2" />
        Remove Background
      </Button>
    </div>
  );
};

export default ImagePreview;