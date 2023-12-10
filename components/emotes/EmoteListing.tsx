import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EmoteListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-4">
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
      {/* <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Laughing Emote</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Laughing Emote" src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>LE</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            Use
          </Button>
        </CardContent>
      </Card> */}
      {/* <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Surprised Emote</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Surprised Emote" src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>SE</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            Use
          </Button>
        </CardContent>
      </Card>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-lg">Thinking Emote</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="Thinking Emote" src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>TE</AvatarFallback>
          </Avatar>
          <Button className="ml-2" variant="outline">
            Use
          </Button>
        </CardContent>
      </Card> */}
    </div>
  )
}