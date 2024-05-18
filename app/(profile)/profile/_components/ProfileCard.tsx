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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import toast from "react-hot-toast";
import { auth } from "@clerk/nextjs";

interface ProfileFormData {
    username: string;
    bio: string;
}

const profileFormSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
});



interface ProfileCardProps {
    userId: string,
    profile: Profile | null;
}


export const ProfileCard = ({ profile, userId }: ProfileCardProps) => {

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: profile?.name || '',
            bio: profile?.bio || '',
        }
      });

    // const onSubmit = async (data: ProfileFormData) => {
    //     try {
    //         const response = await axios.post('/api/profile/route', {
    //             userId: profile?.userId,
    //             name: data.username,
    //             bio: data.bio,
    //         });
    
    //         console.log('Profile updated:', response.data);
    //         reset(response.data); // Reset form with updated data
    //     } catch (error) {
    //         console.error('Failed to update profile:', error);
    //     }
    // };

    const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
        try {
            // Ensure that `userId` is not undefined or null
    
            const response = await axios.post('/api/profile', {
                userId: userId, // Correctly referenced from the profile prop
                name: values.username,
                bio: values.bio
            });
    
            console.log(response.data);  // Log the updated profile data
            toast.success('Profile updated successfully!');
        } catch (error: any) {
            toast.error('Failed to update profile. Please try again.');
            console.error(error);
        }
    }

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
      <Button type="submit" className="flex items-center">
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
            