import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EmoteListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-4">
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Pixel Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Happy Emote" src="/ashootingstar.png" />
            <AvatarFallback>PE</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/pixels">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Kawaii Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Sad Emote" src="/kawaiiboy.png" />
            <AvatarFallback>KE</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/kawaii">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Object Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Angry Emote" src="/hamsandwich.png" />
            <AvatarFallback>OE</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/objects">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Cute Bold Line Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Laughing Emote" src="/cbl.png?height=64&width=64" />
            <AvatarFallback>CBL</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/cuteboldlines">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Text Based Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="BOZO!" src="/textbased.png" />
            <AvatarFallback>TB</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/textbased">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">3D Based Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Laughing Emote" src="/3dbasketball.png" />
            <AvatarFallback>3D</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/3d">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Pepe Based Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Laughing Emote" src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/pepethefrog">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Sticker Based Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Laughing Emote" src="/turtlesticker.png" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/stickers">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Chibi Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Chibi Emote" src="/chibi1.png" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/chibi">Use</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Meme Emotes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Meme Emote" src="/meme.png" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            <Link href="/meme">Use</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}