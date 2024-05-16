"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Emote } from "@prisma/client";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link"

interface ProfileEmotesProps {
    emotes: Emote[];
  }

export default function ProfileEmotes({ emotes }: ProfileEmotesProps) {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold md:text-3xl">Your Emotes</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage the emotes you&apos;ve generated.</p>
          </div>
          <Link href="/emotes">
          <Button variant="outline">
            <PlusIcon className="mr-2 h-4 w-4" />
            Generate New Emote
          </Button>
          </Link>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {emotes.map((emote) => (
          <Card key={emote.id} className="group">
            <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
              <Image
                alt="Emote"
                className="w-full h-full object-contain"
                height={128}
                src={emote.imageUrl || "/placeholder.png"} // replace with the actual image property of the emote
                style={{
                  aspectRatio: "128/128",
                  objectFit: "cover",
                }}
                width={128}
              />
            </CardContent>
            <CardFooter className="pt-4">
              <div className="flex flex-col items-start">
                {/* <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{emote.name}</p> */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Prompt: {emote.prompt}
                </p>
              <div className="mt-2">
                <Button onClick={() => window.open(emote.imageUrl || '')} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                </div>
                 </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}