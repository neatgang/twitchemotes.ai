"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { EmoteForSale } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface MarketplaceProps {
    emotesForSale: EmoteForSale[];
  }

//   function determineHeight(prompt: string): string {
//   const length = prompt.length;
//   if (length < 10) {
//     return "h-48"; // Tailwind class for height
//   } else if (length < 100) {
//     return "h-56";
//   } else {
//     return "h-64";
//   }
// }

export default function Marketplace({ emotesForSale }: MarketplaceProps) {
    return (
      <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold md:text-3xl">Emote Showcase</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Browse unique emotes created by other users.
              </p>
            </div>
            {/* <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filter
            </Button> */}
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {emotesForSale.map((emote) => (
            <Link key={emote.id} href={`/emote/${emote.id}`}>
  <Card key={emote.id}>
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                <Image
                  alt={emote.prompt}
                  className="w-full h-full object-contain"
                  height={128}
                  src={emote.imageUrl}
                  style={{
                    aspectRatio: "128/128",
                    objectFit: "cover",
                  }}
                  width={128}
                />
              </CardContent>
              <CardFooter className="pt-4 flex-col">
  <div className="">
    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{emote.prompt}</p>
    {/* <p className="text-xs text-gray-500 dark:text-gray-400">By: {emote.userId}</p> */}
    {/* <p className="text-sm font-bold mt-2">${emote.price}</p> */}
  </div>
    <Button onClick={() => window.open(emote.imageUrl || '')} className="mt-2 w-full flex" variant="outline">
  {/* <ShoppingCartIcon className="mr-2 h-4 w-4" /> */}
  Download
</Button>
</CardFooter>
            </Card>
            </Link>
          ))}
        </div>
      </main>
    );
  }

function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}