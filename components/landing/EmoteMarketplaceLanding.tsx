"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Image from "next/image"
import { PaletteIcon, DollarSignIcon, ZapIcon, ShoppingCartIcon, BarChartIcon, ShieldCheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import toast from "react-hot-toast"

export default function EmoteMarketplaceLanding() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleBecomeASeller = async () => {
    if (!isLoaded || !user) {
      router.push('/sign-up?redirect=/sell-with-us');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/stripe/connect');
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error connecting to Stripe:", error);
      toast.error("Failed to start Stripe onboarding. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrowseMarketplace = () => {
    router.push('/marketplace/browse');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl"
              >
                Turn Your Creativity into Cash
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/90 max-w-xl"
              >
                Create and sell custom AI-generated emotes on our marketplace. Perfect for Twitch, Discord, and YouTube communities!
              </motion.p>

              <ul className="list-disc list-inside text-white/80">
                <li>AI-powered emote creation</li>
                <li>Fixed price of $1.00 per emote</li>
                <li>You keep 25% of each sale</li>
              </ul>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  onClick={handleBecomeASeller} 
                  className="bg-white text-purple-600 hover:bg-gray-100 text-lg" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Become a Seller"}
                </Button>
                <Button 
                  onClick={handleBrowseMarketplace} 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg" 
                  size="lg"
                >
                  Browse Marketplace
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                alt="AI-Generated Emotes Collage"
                className="rounded-xl shadow-2xl"
                height={600}
                src="/marketplace-collage.png"
                style={{
                  aspectRatio: "800/600",
                  objectFit: "cover",
                }}
                width={800}
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-purple-600">1000+ Emotes Sold!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "1. Create Your Emote", description: "Use our AI tools to generate unique, eye-catching emotes.", icon: PaletteIcon },
              { title: "2. Set Your Price", description: "All emotes are sold at a fixed price of $1.00 for simplicity.", icon: DollarSignIcon },
              { title: "3. Earn Money", description: "You keep 25% of each sale. It's that simple!", icon: BarChartIcon },
            ].map((step, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <step.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button onClick={handleBecomeASeller} className="bg-purple-600 text-white hover:bg-purple-700 text-lg">
              Start Selling Today
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Why Choose Our Marketplace?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide all the tools you need to create, sell, and profit from your emotes with ease.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered Creation", description: "Generate professional-quality emotes with our advanced AI tools.", icon: ZapIcon },
              { title: "Effortless Setup", description: "Create and list your emotes in minutes with our user-friendly interface.", icon: ShoppingCartIcon },
              { title: "Instant Payouts", description: "Receive your earnings directly with seamless Stripe integration.", icon: DollarSignIcon },
              { title: "Large Audience", description: "Reach Twitch, Discord, and YouTube communities all in one place.", icon: BarChartIcon },
              { title: "Secure Transactions", description: "We handle payments and ensure compliance for worry-free selling.", icon: ShieldCheckIcon },
              { title: "Community Support", description: "Join a thriving community of creators and buyers.", icon: PaletteIcon },
            ].map((feature, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                key={index}
                className="bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <feature.icon className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-center mb-12 text-white">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "EmoteArtist123",
                role: "Top Seller",
                image: "/emote-artist-1.png",
                quote: "I've sold over 500 emotes and earned a steady side income. This platform is a game-changer!",
                link: "/seller/emoteartist123"
              },
              {
                name: "StreamerEmotes",
                role: "Twitch Partner",
                image: "/streamer-emotes.png",
                quote: "The AI tools make it so easy to create unique emotes. My viewers love the variety!",
                link: "/seller/streameremotes"
              },
              {
                name: "DiscordDesigner",
                role: "Community Manager",
                image: "/discord-designer.png",
                quote: "I've found a passionate audience for my emotes. The fixed pricing makes it easy for everyone.",
                link: "/seller/discorddesigner"
              }
            ].map((testimonial, index) => (
              <Link href={testimonial.link} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage alt={testimonial.name} src={testimonial.image} />
                      <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">&quot;{testimonial.quote}&quot;</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6">
            Ready to Turn Your Creativity into Cash?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our thriving marketplace today and start earning money from your emote designs. It&apos;s time to unleash your creativity!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleBecomeASeller} 
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Become a Seller Now"}
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}