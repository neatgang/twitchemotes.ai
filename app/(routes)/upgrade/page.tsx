"use client"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { useProModal } from "@/hooks/use-pro-modal";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Component() {

    const [mounted, setMounted] = useState(false);
    const proModal = useProModal();
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) {
      return null;
    }
    
  
    // if (isPro) {
    //   return redirect("/")
    // }
    
  return (
    <>
      <section className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-white">Welcome to EmoteMaker.ai!</h1>
          <p className="text-xl text-white max-w-md mx-auto">
            🚀 Embrace the Future of Emote Creation with EmoteMaker.ai! 🤖✨
          </p>
          <Button onClick={proModal.onOpen} className="text-white bg-yellow-500 hover:bg-yellow-600 transition-all duration-200" variant="default">
            Start Creating Now
          </Button>
        </div>
      </section>
      <section className="py-12 px-4 md:px-6">
        {/* <h2 className="text-center text-3xl font-bold mb-10">Our Special Offers</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-bold">🎮 For the Digital Maverick: Gamers, Streamers, and Digital Conquerors</h3>
            </CardHeader>
            <CardContent className="space-y-4">
            <p>Welcome to a new realm of digital expression! With EmoteMaker.ai, your creative horizons are limitless. Dive into a world where your ideas transform into stunning emotes at the mere click of a button. Whether you&apos;re battling it out on Twitch, leading your community on Discord, or simply elevating your digital presence, EmoteMaker.ai is your secret weapon.</p>

            <h3 className="font-bold">Unleash an Emote Revolution:</h3>
<ul>
  <li>Instant Creation Magic: Just type, and watch your visions come alive in mere seconds.</li>
  <li>Creative Freedom Unlocked: Tailor emotes that resonate with your unique digital persona.</li>
  <li>AI Precision Mastery: Consistently crisp, professional-grade emotes.</li>
  <li>User-Friendly for All: Intuitive and accessible, from gaming rookies to seasoned pros.</li>
  <li>Dominance Across Platforms: Conquer Twitch, Discord, and beyond with your bespoke emotes!</li>
</ul>
              {/* <Button variant="outline">Learn More</Button> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-bold">🎨 For the Artists: Harness AI to Amplify Your Artistic Flair</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Not just for gamers and streamers, EmoteMaker.ai is a potent tool in an artist&apos;s arsenal. Accelerate your emote creation process, meet client demands effortlessly, and focus on what you love most – unleashing your creativity!</p>
                <h3 className="font-bold">Transform Your Artistic Process:</h3>
                <ul>
<li>Workflow Acceleration: Generate initial emote drafts rapidly, saving precious time.</li>
<li>Client Satisfaction Made Easy: Produce diverse emote styles swiftly as per client requests.</li>
<li>Efficient Iteration: Use AI-generated emotes as a creative springboard for final masterpieces.</li>
              </ul>
              {/* <Button variant="outline">Learn More</Button> */}
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="py-12 px-4 md:px-6 bg-gray-100">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">🌟 Special Offer: Unlimited Emote Generation for Just $5/Month!</h2>
          <p className="mx-auto">
          Embark on an endless journey of emote creation with our exclusive monthly subscription. For just $15 a month, gain unlimited access to the revolutionary EmoteMaker.ai platform. Elevate your digital presence, satisfy clients faster, and unleash a world of creativity without any limits.
          </p>
          <Button
            className="text-white bg-green-500 hover:bg-green-600 transition-all duration-200"
            variant="default"
          >
            Start Creating Now
          </Button>
        </div>
      </section>
    </>
  )
}

