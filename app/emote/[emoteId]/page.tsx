"use"

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EmoteForSale, EmoteStatus, EmoteType } from '@prisma/client';
import { db } from '@/lib/db';
import Image from 'next/image';
import { getEmoteById } from '@/actions/get-emote-by-id';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import EmoteProduct from '../_components/EmoteProduct';
import { addEmoteToLibrary } from "@/actions/addEmoteToLibrary";
import { toast } from "react-hot-toast";
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { emoteId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const emoteListing = await db.emoteForSale.findUnique({
    where: {
      id: params.emoteId,
    },
    include: {
      emote: true, // Include the related Emote to get style and model
    },
  });

  if (!emoteListing) {
    return {
      title: 'Emote Not Found',
      description: 'The requested emote could not be found.',
    };
  }

  return {
    title: `${emoteListing.prompt} ${emoteListing.emote.style} Emote | EmoteMaker.ai`,
    description: `A ${emoteListing.prompt} ${emoteListing.emote.style} style emote created with ${emoteListing.emote.model}.`,
    openGraph: {
      title: emoteListing.prompt,
      description: `A ${emoteListing.prompt} ${emoteListing.emote.style} style emote created with ${emoteListing.emote.model}.`,
      images: [
        {
          url: emoteListing.imageUrl,
          width: 1200,
          height: 630,
          alt: emoteListing.prompt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: emoteListing.prompt,
      description: `A ${emoteListing.prompt} ${emoteListing.emote.style} style emote created with ${emoteListing.emote.model}.`,
      images: [emoteListing.imageUrl],
    },
  };
}

const EmoteIdPage = async ({ params }: { params: { emoteId: string } }) => {
  const emoteListing = await db.emoteForSale.findUnique({
    where: {
      id: params.emoteId,
    },
    include: {
      emote: true,
    },
  });

  if (!emoteListing) {
    return <div>No emote found</div>;
  }

  return (
    <>
      <EmoteProduct 
        emoteListing={emoteListing} 
        emoteStyle={emoteListing.style ?? 'Not specified'}
        emoteModel={emoteListing.emote.model ?? 'Not specified'}
      />
    </>
  );
};

export default EmoteIdPage;