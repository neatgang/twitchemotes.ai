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
      emote: true,
    },
  });

  if (!emoteListing) {
    return {
      title: 'Emote Not Found',
      description: 'The requested emote could not be found.',
    };
  }

  const prompt = emoteListing.prompt ?? 'Untitled';
  const style = emoteListing.emote.style ?? 'Unknown';
  const model = emoteListing.emote.model ?? 'Unknown';

  const title = `${prompt} ${style} Emote | EmoteMaker.ai`;
  const description = `A ${prompt} ${style} style emote created with ${model}.`;
  const imageUrl = emoteListing.watermarkedUrl ?? emoteListing.imageUrl ?? '';
  const absoluteImageUrl = new URL(imageUrl, 'https://emotemaker.ai').toString();

  return {
    title,
    description,
    keywords: [prompt, style, 'emote', 'EmoteMaker.ai'].filter(Boolean),
    authors: [{ name: 'EmoteMaker.ai' }],
    creator: 'EmoteMaker.ai',
    publisher: 'EmoteMaker.ai',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://emotemaker.ai/emote/${params.emoteId}`,
      siteName: 'EmoteMaker.ai',
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 1200,
          alt: prompt,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImageUrl],
      creator: '@EmoteMaker_AI',
      site: '@EmoteMaker_AI',
    },
    other: {
      'og:image': absoluteImageUrl,
      'og:image:secure_url': absoluteImageUrl,
      'og:image:width': '1200',
      'og:image:height': '1200',
      'og:image:alt': prompt,
      'og:type': 'website',
      'og:url': `https://emotemaker.ai/emote/${params.emoteId}`,
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
    <div>
      <EmoteProduct 
        emoteListing={emoteListing} 
        emoteStyle={emoteListing.style ?? 'Not specified'}
        emoteModel={emoteListing.emote.model ?? 'Not specified'}
      />
    </div>
  );
};

export default EmoteIdPage;