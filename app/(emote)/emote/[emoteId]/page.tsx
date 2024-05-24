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

// const EmoteIdPage = async ({
//     params
//   }: {
//     params: { emoteId: string }
//   }) => {
    
  
//     const emote = await getEmoteById({
//       // userId,
//       emoteId: params.emoteId,
//     });

//     if (!emote) {
//         return <div>Emote not found.</div>;
//     }

const EmoteIdPage = async ({
    params,
  }: {
    params: {
        emoteId: string;
    };
  }) => {
  
  
  const emoteListing = await db.emoteForSale.findUnique({
      where: {
        id: params.emoteId,
        // userId?: userId
      },
      // orderBy: {
      //   createdAt: "desc",
      // }
    });

    if (!emoteListing) {
        <div>No emote found</div>
    }

    return (
        <>
            <EmoteProduct emoteListing={emoteListing} />
        </>
      )
    }
    
export default EmoteIdPage
  