import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <section className="w-full py-12 bg-white dark:bg-[#222]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-white">
            🎮 Unleash Your Creativity with EmoteMaker.ai! 🚀💬
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
            Welcome to EmoteMaker.ai, your ultimate tool for crafting epic emotes with the power of AI! 🤖✨ Whether you're a gamer, streamer, digital conqueror, or an artist, get ready to revolutionize your digital presence!
          </p>
          <Link href="/create">
            <Button className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Start Creating
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">For Gamers and Streamers 🌟🎨</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Transform your wildest ideas into pixel-perfect emotes at the click of a button. Whether you're a Twitch hero, a Discord master, or just looking to amp up your digital presence, EmoteMaker.ai is your ultimate ally.</p>
            <Link href="/create">
              <Button className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 mt-4 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Start Creating
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">For Artists 🎨🖌️</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">EmoteMaker.ai isn't just for gamers and streamers. Artists can also leverage the power of our AI to generate emotes for clients in less time. Spend less time on the tedious parts of design and more time on what you love - being creative!</p>
            <Link href="/create">
              <Button className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 mt-4 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Start Creating
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}