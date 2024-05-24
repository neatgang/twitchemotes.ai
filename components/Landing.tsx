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
import axios from "axios"
import toast from "react-hot-toast"
import { auth, useUser } from "@clerk/nextjs"

export default function Landing() {

  const [loading, setLoading] = useState(false);
    const [isPro, setIsPro] = useState(false);
    const { user } = useUser()
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
      if (user) {
        router.push('/emotes');
      } else {
        // proModal.onOpen();
        router.push('/sign-in');
      }
    };

    const onSubscribe = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/stripe");
  
        window.location.href = response.data.url;
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }


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
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3 lg:grid-cols-3">
            <Link href="https://www.twitch.tv/xnotloc">
          <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/notloc.png" />
                  <AvatarFallback>NL</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">Notloc</h4>
                  <p className="text-sm text-gray-500">Twitch Streamer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-500">
              &quot;Yo, EmoteMaker.ai is straight up amazing for making custom Twitch emotes! I had some really specific ideas in mind, like a chibi avatar of myself with a chat bubble that said &quot;Yappin&quot; since I&apos;m always going off on tangents on stream. I also wanted a bold &quot;BOZO!&quot; text emote my chat could spam whenever I fail.
Dude, the emote maker had me covered! The chibi creator had a ton of options to make a cute mini-me &quot;Yappin&quot; emote that looks just like my IRL self. And typing in my &quot;BOZO!&quot; text and picking colors and styles was a piece of cake. EmoteMaker.ai made it stupid easy to bring my emote visions to life.
The whole process was quick and the emotes came out clean AF. They match my stream&apos;s vibe perfectly. Since uploading them, chat&apos;s been popping off with the new emotes! The custom &quot;BOZO!&quot; spam when I choke is hilarious and the &quot;Yappin&quot; emote is already an inside joke.
Seriously, if you want dope custom emotes for your stream, don&apos;t sleep on EmoteMaker.ai. It&apos;s the real deal and lets you make exactly what you want with no hassle. 11/10, already planning to make more!&quot;
              </p>
            </div>
            </Link>
            <Link href="https://www.twitch.tv/goldenturtleboy">
          <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="GoldenTurtleBoy" src="/goldenturtle.png" />
                  <AvatarFallback>GT</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">GoldenTurtleBoy</h4>
                  <p className="text-sm text-gray-500">Twitch Streamer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-500">
              &quot;EmoteMaker.ai was a game-changer for creating the perfect pixelated golden turtle emote for my Twitch channel. The AI generated so many adorable designs and after some tweaks, I landed on the ideal shimmering gold turtle that perfectly captured what I had envisioned.&quot;
              </p>
            </div>
            </Link>
            <Link href="https://discord.gg/33uK96vD9N">
          <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="Ducky" src="/ducky.png" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">Ducky</h4>
                  <p className="text-sm text-gray-500">WoW Guild and Discord Community</p>
                </div>
              </div>
              <p className="mt-4 text-gray-500">
              &quot;Oh man, EmoteMaker.ai was a total lifesaver for our WoW guild&apos;s Discord! We really wanted some unique duck emotes that captured the vibe of the game. I wasn&apos;t sure what to expect, but holy cow - the AI came up with so many cool designs blending ducks with WoW stuff.
After playing around with the options a bit, we found the perfect emotes. They&apos;re like ducks cosplaying as epic WoW characters, it&apos;s hilarious and awesome. Seriously, EmoteMaker.ai made the whole process a breeze and the emotes have been a huge hit with our guildies. 10/10 would quack again!&quot;
              </p>
            </div>
            </Link>
          {/* <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="Ducky" src="/goldenturtle.png" />
                  <AvatarFallback>GT</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">Ducky</h4>
                  <p className="text-sm text-gray-500">WoW Guild and Discord Community</p>
                </div>
              </div>
              <p className="mt-4 text-gray-500">
              &quot;Oh man, EmoteMaker.ai was a total lifesaver for our WoW guild&apos;s Discord! We really wanted some unique duck emotes that captured the vibe of the game. I wasn&apos;t sure what to expect, but holy cow - the AI came up with so many cool designs blending ducks with WoW stuff.
After playing around with the options a bit, we found the perfect emotes. They&apos;re like ducks cosplaying as epic WoW characters, it&apos;s hilarious and awesome. Seriously, EmoteMaker.ai made the whole process a breeze and the emotes have been a huge hit with our guildies. 10/10 would quack again!&quot;
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}
