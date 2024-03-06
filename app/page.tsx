"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useProModal } from "@/hooks/use-pro-modal";
import { checkSubscription } from "@/lib/subscription";
import { Zap } from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function LandingPage() {
  const [isPro, setIsPro] = useState(false);
  const router = useRouter();
  const proModal = useProModal();

  useEffect(() => {
    const fetchIsPro = async () => {
      const proStatus = await checkSubscription();
      setIsPro(proStatus);
    };

    fetchIsPro();
  }, []);

  const handleStartCreating = () => {
    if (isPro) {
      router.push('/emotes');
    } else {
      proModal.onOpen();
    }
  };

  return (
    <section className="w-full py-12 bg-white dark:bg-[#222]">
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-white pb-6">
            🎮 Unleash Your Creativity with EmoteMaker.ai! 🚀
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
            Welcome to EmoteMaker.ai, your ultimate tool for crafting epic emotes with the power of AI! 🤖✨ Whether you&apos;re a gamer, streamer, digital conqueror, or an artist, get ready to revolutionize your digital presence!
          </p>
          {/* <Link href="/emotes"> */}
          <Button onClick={handleStartCreating} variant="default" className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 mt-4 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        Start Creating
        <Zap className="w-4 h-4 ml-2 fill-white" />
      </Button>
          {/* </Link> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">For Gamers and Streamers 🌟🎨</h2>
  <p className="mt-2 text-gray-600 dark:text-gray-300">Transform your wildest ideas into pixel-perfect emotes at the click of a button. Whether you&apos;re a Twitch hero, a Discord master, or just looking to amp up your digital presence, EmoteMaker.ai is your ultimate ally.</p>
  <div className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
  <p className="font-bold">🌪️ Instant Creation Magic:</p><p> Type your vision, and watch as AI brings it to life in seconds.</p>
  <p className="font-bold">🖌️ Unleash Your Creativity:</p><p>Make emotes that truly vibe with your unique style.</p>
  <p className="font-bold">🤖 AI Precision at Its Finest:</p><p> Expect crisp, professional-quality emotes every time.</p>
  <p className="font-bold">🕹️ Easy and Accessible:</p><p> User-friendly for all, from gaming newbies to esports legends.</p>
  <p className="font-bold">🌐 Perfect for All Platforms:</p><p> Rule Twitch, Discord, and the entire digital realm with your custom emotes!</p>
  </div>
  {/* <Link href="/emotes"> */}
  <Button onClick={handleStartCreating} variant="default" className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 mt-4 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        Start Creating
        <Zap className="w-4 h-4 ml-2 fill-white" />
      </Button>
  {/* </Link> */}
</div>
<div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">For Artists 🎨🖌️</h2>
  <p className="mt-2 text-gray-600 dark:text-gray-300">EmoteMaker.ai isn&apost just for gamers and streamers. Artists can also leverage the power of our AI to generate emotes for clients in less time. Spend less time on the tedious parts of design and more time on what you love - being creative!</p>
  <div className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
    <p className="font-bold">🚀 Speed Up Your Workflow: </p>
    <p>Generate emote drafts in seconds, giving you more time to refine and perfect your designs.</p>
    <p className="font-bold">🎯 Meet Client Needs:</p><p>Quickly create a variety of emotes based on client specifications.</p>
    <p className="font-bold">🔄 Iterate Faster:</p><p>Use the AI-generated emotes as a starting point and iterate on them to create the final product.</p>
  </div>
  {/* <Link href="/emotes"> */}
  <Button onClick={handleStartCreating} variant="default" className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 mt-4 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        Start Creating
        <Zap className="w-4 h-4 ml-2 fill-white" />
      </Button>
  {/* </Link> */}
</div>
</div>
        <div className="justify-items-center items-center gap-4 mt-8 mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {demophotos.map((photo, index) => (
    <Card key={index} style={{ position: "relative", width: "200px", height: "200px" }}>
      <Image
        layout="fill"
        objectFit="cover"
        alt={`Demo photo ${photo.id}`}
        src={photo.image} // Use photo.image as the image path
      />
    </Card>
  ))}
</div>
      </div>
    </section>
  )
}