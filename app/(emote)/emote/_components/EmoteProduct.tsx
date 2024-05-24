import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Emote, EmoteForSale } from "@prisma/client";
import { CheckIcon, StarIcon, ZoomInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EmoteIdPageProps {
  emoteListing: EmoteForSale | null;
}

export default function ListEmote({ emoteListing }: EmoteIdPageProps) {

    return (

<main className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
  <div className="flex flex-col items-center justify-center">
    <div className="relative w-full rounded-lg overflow-hidden">
      <Image
        alt={emoteListing?.prompt || ''}
        className="w-full rounded-lg object-cover"
        decoding="async"
        height={800}
        loading="lazy"
        src={emoteListing?.imageUrl || ''}
        width={800}
      />
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <ZoomInIcon className="w-8 h-8 text-white bg-black/50 rounded-full p-2" />
      </div> */}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {/* <Image
        alt="Excited Purple Haired Girl Chibi Emote Angle 1"
        className="w-full aspect-square rounded-lg object-cover"
        decoding="async"
        height={200}
        loading="lazy"
        src="/placeholder.svg"
        width={200}
      />
      <Image
        alt="Excited Purple Haired Girl Chibi Emote Angle 2"
        className="w-full aspect-square rounded-lg object-cover"
        decoding="async"
        height={200}
        loading="lazy"
        src="/placeholder.svg"
        width={200}
      />
      <Image
        alt="Excited Purple Haired Girl Chibi Emote Angle 3"
        className="w-full aspect-square rounded-lg object-cover"
        decoding="async"
        height={200}
        loading="lazy"
        src="/placeholder.svg"
        width={200}
      />
      <Image
        alt="Excited Purple Haired Girl Chibi Emote Angle 4"
        className="w-full aspect-square rounded-lg object-cover"
        decoding="async"
        height={200}
        loading="lazy"
        src="/placeholder.svg"
        width={200}
      /> */}
    </div>
    <div className="w-full aspect-video rounded-lg overflow-hidden mt-6">
      <span className="w-full h-full object-cover rounded-md bg-muted" />
    </div>
  </div>
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold">{emoteListing?.prompt}</h1>
      <p className="text-gray-500 dark:text-gray-400">
        {/* Hey there, fellow emote enthusiast! Get ready to add some serious personality to your chat with this
        vibrant and expressive chibi emote of a purple-haired girl. It&apos;s the perfect way to convey excitement,
        enthusiasm, and a touch of playful energy that&apos;ll make your messages pop! */}
      </p>
      <div className="mt-4 space-y-4">
        {/* <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
          <span className="text-sm font-medium">4.2 (12,345 reviews)</span>
        </div> */}
        {/* <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
          “This emote is a must-have for any streamer or Discord community! The animation is so lively and the
          design is absolutely adorable.”
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">- @TwitchStreamer123</div>
        </blockquote>
        <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
          “I&apos;ve been using this emote in my Discord server and everyone loves it! It&apos;s the perfect way to express
          excitement and hype.”
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">- @DiscordMod456</div>
        </blockquote> */}
      </div>
      {/* <ul className="mt-4 space-y-2">
        <li className="flex items-center">
          <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
          <span>Unique, hand-drawn style that stands out from the crowd</span>
        </li>
        <li className="flex items-center">
          <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
          <span>Animated for extra liveliness and personality</span>
        </li>
        <li className="flex items-center">
          <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
          <span>Transparent background for seamless integration</span>
        </li>
      </ul> */}
    </div>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Artist</div>
        {/* <div className="font-medium">{emoteListing.}</div> */}
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Size</div>
        <div className="font-medium">1048x1048 px</div>
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Style</div>
        <div className="font-medium">{emoteListing?.style}</div>
      </div>
    </div>
    <Button className="w-full" size="lg">
      {/* Unleash this Sassy Emote - $2.99 */}
      Download this emote
    </Button>
  </div>
</div>
{/* <Separator className="my-12" />
<div className="space-y-8">
  <div>
    <h2 className="text-2xl font-bold">Similar Chibi Emotes</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      <div className="space-y-2">
        <Image
          alt="Laughing Chibi Emote"
          className="w-full aspect-square rounded-lg object-cover"
          decoding="async"
          height={200}
          loading="lazy"
          src="/placeholder.svg"
          width={200}
        />
        <div className="text-sm font-medium">Laughing Chibi Emote</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">$2.99</div>
        <Button className="w-full" size="sm">
          Add Laughing Emote
        </Button>
      </div>
      <div className="space-y-2">
        <Image
          alt="Surprised Chibi Emote"
          className="w-full aspect-square rounded-lg object-cover"
          decoding="async"
          height={200}
          loading="lazy"
          src="/placeholder.svg"
          width={200}
        />
        <div className="text-sm font-medium">Surprised Chibi Emote</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">$2.99</div>
        <Button className="w-full" size="sm">
          Add Surprised Emote
        </Button>
      </div>
      <div className="space-y-2">
        <Image
          alt="Confused Chibi Emote"
          className="w-full aspect-square rounded-lg object-cover"
          decoding="async"
          height={200}
          loading="lazy"
          src="/placeholder.svg"
          width={200}
        />
        <div className="text-sm font-medium">Confused Chibi Emote</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">$2.99</div>
        <Button className="w-full" size="sm">
          Add Confused Emote
        </Button>
      </div>
      <div className="space-y-2">
        <Image
          alt="Angry Chibi Emote"
          className="w-full aspect-square rounded-lg object-cover"
          decoding="async"
          height={200}
          loading="lazy"
          src="/placeholder.svg"
          width={200}
        />
        <div className="text-sm font-medium">Angry Chibi Emote</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">$2.99</div>
        <Button className="w-full" size="sm">
          Add Angry Emote
        </Button>
      </div>
    </div>
  </div>
  <div>
    <h2 className="text-2xl font-bold">Related Emote Categories</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      <Link className="group" href="#">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            alt="Cute Emotes"
            className="w-full aspect-square rounded-lg object-cover group-hover:opacity-50 transition-opacity"
            decoding="async"
            height={200}
            loading="lazy"
            src="/placeholder.svg"
            width={200}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-lg p-2">
              <div className="text-white font-medium">Cute Emotes</div>
            </div>
          </div>
        </div>
      </Link>
      <Link className="group" href="#">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            alt="Anime Emotes"
            className="w-full aspect-square rounded-lg object-cover group-hover:opacity-50 transition-opacity"
            decoding="async"
            height={200}
            loading="lazy"
            src="/placeholder.svg"
            width={200}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-lg p-2">
              <div className="text-white font-medium">Anime Emotes</div>
            </div>
          </div>
        </div>
      </Link>
      <Link className="group" href="#">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            alt="Twitch Emotes"
            className="w-full aspect-square rounded-lg object-cover group-hover:opacity-50 transition-opacity"
            decoding="async"
            height={200}
            loading="lazy"
            src="/placeholder.svg"
            width={200}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-lg p-2">
              <div className="text-white font-medium">Twitch Emotes</div>
            </div>
          </div>
        </div>
      </Link>
      <Link className="group" href="#">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            alt="Discord Emotes"
            className="w-full aspect-square rounded-lg object-cover group-hover:opacity-50 transition-opacity"
            decoding="async"
            height={200}
            loading="lazy"
            src="/placeholder.svg"
            width={200}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-lg p-2">
              <div className="text-white font-medium">Discord Emotes</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>
  <div>
    <h2 className="text-2xl font-bold">Popular Emote Collections</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      <Link className="group" href="#">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            alt="Kawaii Emote Pack"
            className="w-full aspect-square rounded-lg object-cover group-hover:opacity-50 transition-opacity"
            decoding="async"
            height={200}
            loading="lazy"
            src="/placeholder.svg"
            width={200}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-lg p-2">
              <div className="text-white font-medium">Kawaii Emote Pack</div>
            </div>
          </div>
        </div>
        <Button className="w-full mt-2" size="sm">
          Get Kawaii Pack
        </Button>
      </Link>
      <Link className="group" href="#">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            alt="Gamer Emote Pack"
            className="w-full aspect-square rounded-lg object-cover group-hover:opacity-50 transition-opacity"
            decoding="async"
            height={200}
            loading="lazy"
            src="/placeholder.svg"
            width={200}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-lg p-2">
              <div className="text-white font-medium">Gamer Emote Pack</div>
            </div>
          </div>
        </div>
        <Button className="w-full mt-2" size="sm">
          Get Gamer Pack
        </Button>
      </Link>
      <Link className="group" href="#">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            alt="Streamer Emote Pack"
            className="w-full aspect-square rounded-lg object-cover group-hover:opacity-50 transition-opacity"
            decoding="async"
            height={200}
            loading="lazy"
            src="/placeholder.svg"
            width={200}
          />
        </div>
      </Link>
    </div>
  </div>
</div> */}
</main>
    )
}