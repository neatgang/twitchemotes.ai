"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TwitchIcon, YoutubeIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import { Profile } from '@prisma/client';

const socialLinksSchema = z.object({
  twitch: z.string().optional(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
});

interface ProfileCardProps {
  userId: string,
  profile: Profile | null;
}

export const SocialLinksCard = ({ profile, userId }: ProfileCardProps) => {
  const form = useForm({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      twitch: profile?.twitch || '',
      // username: profile?.name || '',
      // bio: profile?.bio || '',
      youtube: profile?.youtube || '',
      instagram: profile?.instagram || '',
      twitter: profile?.twitter || '',
    }
  });

  const onSubmit = async (data: z.infer<typeof socialLinksSchema>) => {
    try {
      const response = await axios.post('/api/profile', {
        userId,
        ...data
      });
      console.log(response)
      toast.success('Social links updated successfully!');
    } catch (error) {
      toast.error('Failed to update social links.');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>Connect your social media accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="twitch"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel className="flex items-center gap-2">
                    <TwitchIcon className="w-6 h-6 text-purple-500" />
                    Set your Twitch
                  </FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Twitch username"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="youtube"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel className="flex items-center gap-2">
                    <YoutubeIcon className="w-6 h-6 text-red-500" />
                    Set your YouTube
                  </FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="YouTube channel"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="instagram"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel className="flex items-center gap-2">
                    <InstagramIcon className="w-6 h-6 text-pink-500" />
                    Set your Instagram
                  </FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Instagram handle"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="twitter"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel className="flex items-center gap-2">
                    <TwitterIcon className="w-6 h-6 text-blue-500" />
                    Set your Twitter
                  </FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Twitter handle"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

        <Button type="submit" className="flex items-center">
          Save
          </Button>
          </form>
        </Form>
        </CardContent>
    </Card>
  );
};