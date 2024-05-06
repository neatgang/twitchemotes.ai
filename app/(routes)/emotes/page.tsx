import EmoteListing from "@/components/emotes/EmoteListing";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Metadata } from "next";
import Image from "next/image"
import Link from "next/link"

const demophotos = [
  {
    id: 5,
    image: "/asmonemote.png",
  },
  {
    id: 6,
    image: "/quinemote.png",
  },
  {
    id: 7,
    image: "/esfandemote1.png",
  },
  {
    id: 7,
    image: "/tyler1.png",
  },
  {
  id: 1,
  image: "/foxemote1.png",
},
{
  id: 2,
  image: "/elf.png",
},
{
  id: 3,
  image: "/determinedcat.png",
},
{
  id: 4,
  image: "/gamercat.png",
},

]; 

export const metadata: Metadata = {
  title: 'EmoteMaker.ai',
  description: 'Turn your prompt into an emote, perfect for Twitch Streamers, Discord Moderators, and others.',
}

export default function LandingPage() {
  return (
    <section className="w-full py-12 bg-white dark:bg-[#222]">
<div className="flex flex-col items-center p-6 bg-white rounded-lg">
  {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-white">For Artists 🎨🖌️</h2>
  <p className="mt-2 text-gray-600 dark:text-gray-300">EmoteMaker.ai isn&apost just for gamers and streamers. Artists can also leverage the power of our AI to generate emotes for clients in less time. Spend less time on the tedious parts of design and more time on what you love - being creative!</p>
  <div className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
    <p className="font-bold">🚀 Speed Up Your Workflow: </p>
    <p>Generate emote drafts in seconds, giving you more time to refine and perfect your designs.</p>
    <p className="font-bold">🎯 Meet Client Needs:</p><p>Quickly create a variety of emotes based on client specifications.</p>
    <p className="font-bold">🔄 Iterate Faster:</p><p>Use the AI-generated emotes as a starting point and iterate on them to create the final product.</p>
  </div> */}
  <EmoteListing />
  </div>
    </section>
  )
}