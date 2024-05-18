"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Image from "next/image"
import { CloudLightningIcon, ComputerIcon, SparkleIcon, TimerIcon, TwitchIcon, WandIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useProModal } from "@/hooks/use-pro-modal"
import { checkSubscription } from "@/lib/subscription"

export default function Landing() {

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
        // proModal.onOpen();
        router.push('/pricing');
      }
    };


  return (
    <>
      <section className="relative w-full bg-gradient-to-r from-[#7928CA] to-[#FF0080] py-12 md:py-18 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-white">
                <SparkleIcon className="mr-2 h-5 w-5" />
                <span className="text-sm font-medium">EmoteMaker.ai</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                Unleash Your Creativity with EmoteMaker.ai!
              </h1>
              <p className="max-w-xl text-lg text-white/80">
                Empower your Twitch streams and Discord communities with custom, vibrant emotes created effortlessly.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {/* <Link href="/emotes"> */}
                <Button onClick={handleStartCreating} className="bg-white text-[#7928CA] hover:bg-gray-100" size="lg" variant="default" >
                  Get Started
                </Button>
                {/* </Link> */}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
                <Image
                  alt="Emotes Collage"
                  className="h-full w-full object-cover object-center"
                  height={600}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "800/600",
                    objectFit: "cover",
                  }}
                  width={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-12 md:py-18 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <TwitchIcon className="h-12 w-12 text-[#7928CA]" />
              <h3 className="mt-4 text-xl font-bold">Frustrated Streamers</h3>
              <p className="mt-2 text-gray-500">
                Creating custom emotes can be a frustrating and time-consuming process for streamers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <ComputerIcon className="h-12 w-12 text-[#7928CA]" />
              <h3 className="mt-4 text-xl font-bold">Complicated Design Software</h3>
              <p className="mt-2 text-gray-500">
                Traditional design tools can be complex and overwhelming, especially for those without design
                experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <TimerIcon className="h-12 w-12 text-[#7928CA]" />
              <h3 className="mt-4 text-xl font-bold">Time-Consuming Process</h3>
              <p className="mt-2 text-gray-500">
                Creating custom emotes often involves a lengthy and tedious process, taking time away from content
                creation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-gradient-to-r from-[#FF0080] to-[#7928CA] py-12 md:py-18 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
                <Image
                  alt="Emote Creation Process"
                  className="h-full w-full object-cover object-center"
                  height={600}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "800/600",
                    objectFit: "cover",
                  }}
                  width={800}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-white">
                <SparkleIcon className="mr-2 h-5 w-5" />
                <span className="text-sm font-medium">The Solution</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                Instant Creation Magic
              </h2>
              <p className="max-w-xl text-lg text-white/80">
                EmoteMaker.ai revolutionizes the emote creation process with its cutting-edge AI technology and
                user-friendly interface.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4">
                  <WandIcon className="h-8 w-8 text-white" />
                  <div>
                    <h3 className="text-lg font-bold text-white">One-Click Background Removal</h3>
                    <p className="text-sm text-white/80">
                      Easily remove backgrounds from images with a single click, allowing you to create transparent
                      emotes effortlessly.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CloudLightningIcon className="h-8 w-8 text-white" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Rapid Emote Generation</h3>
                    <p className="text-sm text-white/80">
                      Leverage the power of AI to generate custom emotes in seconds, saving you valuable time and
                      effort.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-12 md:py-18 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-[#7928CA] px-4 py-1 text-white">
                <SparkleIcon className="mr-2 h-5 w-5" />
                <span className="text-sm font-medium">One-Click Background Removal</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                Effortless Transparent Emotes
              </h2>
              <p className="max-w-xl text-lg text-gray-500">
                Say goodbye to tedious background removal tasks. With EmoteMaker.ai, you can create transparent emotes
                with a single click, saving you valuable time and effort.
              </p>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  {/* <Image
                    alt="Emote with Background"
                    className="aspect-square object-contain rounded-lg"
                    height={400}
                    src="/placeholder.svg"
                    width={400}
                  /> */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">Before</div>
                </div>
                <div className="relative">
                  {/* <Image
                    alt="Transparent Emote"
                    className="aspect-square object-contain rounded-lg"
                    height={400}
                    src="/placeholder.svg"
                    width={400}
                  /> */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">After</div>
                </div>
              </div>
              <div className="mt-4">
                <span className="w-full rounded-md bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-12 md:py-18 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight">Emote Styles Gallery</h2>
            <p className="max-w-xl mx-auto text-lg text-gray-500">
              Explore the diverse range of emote styles available on EmoteMaker.ai, from pixel art to kawaii designs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pixel Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Pixel Emote" src="/ashootingstar.png" />
                <AvatarFallback>PE</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Kawaii Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Kawaii Emote" src="/kawaiiboy.png" />
                <AvatarFallback>KE</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Object Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Object Emote" src="/hamsandwich.png" />
                <AvatarFallback>OE</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Cute Bold Line Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Cute Bold Line Emote" src="/cbl.png?height=64&width=64" />
                <AvatarFallback>CBL</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Text Based Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Text Based Emote" src="/textbased.png" />
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">3D Based Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="3D Emote" src="/3dbasketball.png" />
                <AvatarFallback>3D</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pepe Based Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Pepe Emote" src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Sticker Based Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Sticker Emote" src="/turtlesticker.png" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
            <h3 className="text-xl font-bold">Chibi Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Chibi Emote" src="/chibi1.png" />
                <AvatarFallback>CE</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Meme Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Meme Emote" src="/meme.png" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Text Based Emotes</h3>
              <Avatar className="w-16 h-16">
                <AvatarImage alt="Text Based Emote" src="/textbased.png" />
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-12 md:py-18 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight">User Testimonials</h2>
            <p className="max-w-xl mx-auto text-lg text-gray-500">
              See what our satisfied customers have to say about EmoteMaker.ai.
            </p>
          </div>
          {/* <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-gray-500">Twitch Streamer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-500">
              &quot;EmoteMaker.ai has been a game-changer for my Twitch channel! I can now create custom emotes in minutes,
                which has helped me engage with my community in a more personal and fun way. The background removal tool
                is so easy to use, and the emote styles are top-notch.&quot;
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">Jane Smith</h4>
                  <p className="text-sm text-gray-500">Discord Community Manager</p>
                </div>
              </div>
              <p className="mt-4 text-gray-500">
              &quot;As a Discord community manager, I&apos;ve struggled to find affordable and high-quality emotes for our
                server. EmoteMaker.ai has solved that problem! The AI-generated emotes are incredibly unique and
                perfectly capture the vibe of our community. Plus, the rapid emote generation saves me so much time and
                effort.&quot;
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">Bob Johnson</h4>
                  <p className="text-sm text-gray-500">Content Creator</p>
                </div>
              </div>
              <p className="mt-4 text-gray-500" />
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}
