"use client"

import { Dispatch, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Bird, Rabbit, Turtle } from "lucide-react"
import axios from "axios"
import { z } from "zod"
import { Form, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetState } from "zustand"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"


const formSchema = z.object({
    style: z.string(),
    prompt: z.string(),
  });

export const SettingsForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
        //   amount: "1",
        //   resolution: "512x512",
        //   emotion: "",
        //   additionalAttributes: "",
          // style: "",
        }
      });

    const onSubmit = async (data: any) => {
      let finalPrompt = data.prompt;
      if (data.style === "pixel") {
        finalPrompt = `Design a pixel art Twitch emote that encapsulates the theme '${data.prompt}'. The emote should be reminiscent of classic 8-bit or 16-bit video games, employing a limited color palette to achieve a distinctly pixelated aesthetic. Focus on conveying the intended emotion through clear, simple pixel art expressions that are easily recognizable even at small scales. Ensure the design maintains visual clarity and impact when displayed in chat.`
      }
  
      try {
        const response = await axios.post('/api/3dicons', { prompt: finalPrompt });
        console.log(response.data);
  
        // Assuming the response data is an array of objects with a 'b64_json' property
        const urls = response.data.map((image: { b64_json: string }) => `data:image/jpeg;base64,${image.b64_json}`);
        (urls);
        toast.success('Emote generated successfully!');
      } catch (error) {
        // Handle error...
        toast.error('Failed to generate emote. Please try again.');
        console.error(error);
      }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                </legend>
                <div className="grid gap-3">
                    <Label htmlFor="style">Style</Label>
                    <Select>
                        <SelectTrigger
                            id="style"
                            className="items-start [&_[data-description]]:hidden"
                        >
                            <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pixel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    {/* <Rabbit className="size-5" /> */}
                                    <div className="grid gap-0.5">
                                        <p>
                                            {/* Style: {" "} */}
                                            <span className="font-medium text-foreground">
                                                Pixel
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            8-bit charm with clear, emotive expressions.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                            <SelectItem value="cartoon">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    {/* <Rabbit className="size-5" /> */}
                                    <div className="grid gap-0.5">
                                        <p>
                                            {/* Style: {" "} */}
                                            <span className="font-medium text-foreground">
                                                Cartoon
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            Cartoon-styled emotes with vibrant colors and exaggerated features for expressive, impactful chat visuals.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                            {/* Other SelectItems... */}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Input id="prompt" type="string" placeholder="A shooting star" />
                </div>
                {/* <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="top-p">Top P</Label>
                        <Input id="top-p" type="number" placeholder="0.7" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="top-k">Top K</Label>
                        <Input id="top-k" type="number" placeholder="0.0" />
                    </div>
                </div> */}
            </fieldset>
            {/* <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                </legend>
                <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="assistant">Assistant</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        placeholder="You are a..."
                        className="min-h-[9.5rem]"
                    />
                </div>
            </fieldset> */}
             <Button type="submit" variant="default">Generate</Button>
        </form>
        </Form>
    )
        }