import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InstagramIcon, TwitchIcon, TwitterIcon, YoutubeIcon } from "lucide-react";


export const SocialLinksCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Social Links</CardTitle>
      <CardDescription>Connect your social media accounts.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <TwitchIcon className="w-6 h-6 text-purple-500" />
          <Input placeholder="Twitch Username" />
        </div>
        <div className="flex items-center gap-2">
          <YoutubeIcon className="w-6 h-6 text-red-500" />
          <Input placeholder="YouTube Channel" />
        </div>
        <div className="flex items-center gap-2">
          <InstagramIcon className="w-6 h-6 text-pink-500" />
          <Input placeholder="Instagram Username" />
        </div>
        <div className="flex items-center gap-2">
          <TwitterIcon className="w-6 h-6 text-blue-500" />
          <Input placeholder="Twitter Username" />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button>Save Links</Button>
    </CardFooter>
  </Card>
);