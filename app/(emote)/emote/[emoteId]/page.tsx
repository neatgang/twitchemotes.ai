import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EmoteForSale, EmoteStatus, EmoteType } from '@prisma/client';
import { db } from '@/lib/db';
import Image from 'next/image';
import { getEmoteById } from '@/actions/get-emote-by-id';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { auth } from '@clerk/nextjs';
import EmoteProduct from '../_components/EmoteProduct';

export async function generateMetadata({ params }: { params: { emoteId: string } }) {
  const emoteListing = await db.emoteForSale.findUnique({
    where: {
      id: params.emoteId,
    },
  });

  if (!emoteListing) {
    return {
      title: 'Emote Not Found',
      description: 'The requested emote could not be found.',
    };
  }

  return {
    title: emoteListing.prompt,
    description: `View details of the emote "${emoteListing.prompt}"`,
    openGraph: {
      title: emoteListing.prompt,
      description: `View details of the emote "${emoteListing.prompt}"`,
      images: [emoteListing.imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: emoteListing.prompt,
      description: `View details of the emote "${emoteListing.prompt}"`,
      images: [emoteListing.imageUrl],
    },
  };
}

const EmoteIdPage = async ({ params }: { params: { emoteId: string } }) => {
  const emoteListing = await db.emoteForSale.findUnique({
    where: {
      id: params.emoteId,
    },
  });

  if (!emoteListing) {
    return <div>No emote found</div>;
  }

  return (
    <>
      <EmoteProduct emoteListing={emoteListing} />
    </>
  );
};

export default EmoteIdPage;