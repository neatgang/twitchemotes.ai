"use client"

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Profile } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import toast from "react-hot-toast";
import { getUser } from "@/actions/get-user";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface ProfileFormData {
    username: string;
    bio: string;
}

const profileFormSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
    isPublic: z.boolean(), // Add this line
});

interface ProfileCardProps {
    userId: string,
    profile: Profile | null;
}

export const ProfileCard = ({ profile, userId }: ProfileCardProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: profile?.name || '',
            bio: profile?.bio || '',
            isPublic: profile?.isPublic || false, // Initialize isPublic
        }
    });

    const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/profile', {
                userId: userId,
                name: values.username,
                bio: values.bio,
                isPublic: values.isPublic,
            });

            console.log(response.data);
            toast.success('Profile updated successfully!');
            
            // Update the user data using the getUser action
            await getUser({ userId, name: values.username });
        } catch (error: any) {
            toast.error('Failed to update profile. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleConnectStripe = async () => {
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

    return (
        <Card>
                     <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your public profile information.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form
      onSubmit={form.handleSubmit(onSubmit)}  className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
  name="username"
  render={({ field }) => (
    <FormItem className="col-span-12">
      <FormLabel>Set your username</FormLabel>
      <FormControl className="m-0 p-0">
        <Input
          className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
        //   disabled={isLoading} 
          placeholder="emotemaker" 
          {...field}
        />
      </FormControl>
    </FormItem>
  )}
  />
                  <FormField
  name="bio"
  render={({ field }) => (
    <FormItem className="col-span-12">
      <FormLabel>Set your bio</FormLabel>
      <FormControl className="m-0 p-0">
        <Input
          className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
        //   disabled={isLoading} 
          placeholder="I am a simple streamer" 
          {...field}
        />
      </FormControl>
    </FormItem>
  )}
  />
      <FormField
  name="isPublic"
  render={({ field }) => (
    <FormItem className="col-span-12 flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">Public Profile</FormLabel>
        <FormDescription>
          Make your profile visible to everyone
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
    </FormItem>
  )}
  />
      <div className="col-span-full">
                            <Button
                                type="button"
                                onClick={handleConnectStripe}
                                disabled={isLoading || !!profile?.stripeConnectAccountId}
                            >
                                {profile?.stripeConnectAccountId ? "Stripe Connected" : "Connect Stripe"}
                            </Button>
                        </div>

                        <Button type="submit" className="col-span-full">
                            Save
                        </Button>
                </form>
            </Form>
            </CardContent>
            <CardFooter>

 </CardFooter>
            </Card>
    );
            }
            