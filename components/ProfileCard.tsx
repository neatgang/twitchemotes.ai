import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Instagram, Twitch, Twitter, Youtube } from "lucide-react"

interface User {
  id: string
  name?: string
  image?: string
  bio?: string
  social: {
    twitch?: string
    youtube?: string
    instagram?: string
    twitter?: string
  }
}

function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex items-center justify-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.image || "/default-avatar.png"} alt={user.name || "User"} />
          <AvatarFallback>{user.name?.[0] || "A"}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <h2 className="text-2xl font-bold">{user.name || "Anonymous User"}</h2>
        <p className="text-muted-foreground mt-2">{user.bio || "No bio provided"}</p>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        {user.social.twitch && (
          <a href={`https://twitch.tv/${user.social.twitch}`} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600">
            <Twitch size={24} />
          </a>
        )}
        {user.social.youtube && (
          <a href={`https://youtube.com/@${user.social.youtube}`} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
            <Youtube size={24} />
          </a>
        )}
        {user.social.instagram && (
          <a href={`https://instagram.com/${user.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
            <Instagram size={24} />
          </a>
        )}
        {user.social.twitter && (
          <a href={`https://twitter.com/${user.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
            <Twitter size={24} />
          </a>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProfileCard;