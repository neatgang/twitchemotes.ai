import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export const ProfileCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Profile</CardTitle>
      <CardDescription>Manage your public profile information.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input defaultValue="@emomaker" id="username" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input defaultValue="emomaker@example.com" id="email" type="email" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea defaultValue="I create awesome emotes for streamers and content creators." id="bio" />
        </div>
        <div>
          <Label htmlFor="password">Change Password</Label>
          <Input id="password" placeholder="Enter new password" type="password" />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button>Save Changes</Button>
    </CardFooter>
  </Card>
);