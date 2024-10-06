import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Star, TrendingUp, Zap } from "lucide-react"
import Image from "next/image"

export default function EmoteMakerMarketplace() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <h1 className="text-2xl font-bold">EmoteMaker.ai Marketplace</h1> */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8 w-96" placeholder="Search emotes..." />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Emotes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="p-0">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=Emote ${i}`}
                    alt={`Featured Emote ${i}`}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">Awesome Emote {i}</CardTitle>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$4.99</span>
                    <Badge variant="secondary">AI-Generated</Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="default">Add to Cart</Button>
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Categories</h2>
          <Tabs defaultValue="chibi">
            <TabsList>
              <TabsTrigger value="chibi">Chibi</TabsTrigger>
              <TabsTrigger value="pixel">Pixel Art</TabsTrigger>
              <TabsTrigger value="kawaii">Kawaii</TabsTrigger>
              <TabsTrigger value="object">Object-based</TabsTrigger>
              <TabsTrigger value="text">Text-based</TabsTrigger>
            </TabsList>
            <TabsContent value="chibi" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Image
                    key={i}
                    src={`/placeholder.svg?height=100&width=100&text=Chibi ${i}`}
                    alt={`Chibi Emote ${i}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </TabsContent>
            {/* Similar TabsContent for other categories */}
          </Tabs>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Top Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`/placeholder-user.jpg`} />
                    <AvatarFallback>S{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">Super Creator {i}</h3>
                    <p className="text-sm text-muted-foreground">1000+ sales</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <Star className="h-4 w-4 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-muted mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About EmoteMaker.ai</h3>
              <p className="text-sm text-muted-foreground">
                Create and sell unique AI-generated emotes for your streaming channels.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">How It Works</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-2">Stay updated with our latest features and emotes!</p>
              <div className="flex">
                <Input placeholder="Your email" className="rounded-r-none" />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}