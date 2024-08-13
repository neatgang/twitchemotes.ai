import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { ActiveTool, Editor } from "../types";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  prompt: z.string().min(2, { message: "Prompt must be at least 2 characters." }),
  amount: z.string().default("1"),
  resolution: z.string().default("512x512"),
  emoteType: z.string().default("default"), // Add emoteType to the schema
  model: z.string().default("")
});

interface EmoteGeneratorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const EmoteGeneratorSidebar = ({ activeTool, onChangeActiveTool, editor }: EmoteGeneratorSidebarProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
      emoteType: "default",
      model: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/generate-emote", data);
      setPhotos(response.data.photos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "emote-generator" ? "visible" : "hidden")}>
      <ToolSidebarHeader title="Generate Emotes" description="Create new emotes for your canvas" />
      <ScrollArea>
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Model</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dalle3">Dalle3</SelectItem>
                          <SelectItem value="stable-diffusion-v3">Stable Diffusion V3</SelectItem>
                          <SelectItem value="stable-diffusion-xl">Stable Diffusion XL</SelectItem>
                          <SelectItem value="high-quality-stable-video-diffusion">HQ Stable Video Diffusion</SelectItem>
                          <SelectItem value="stable-diffusion-turbo">Stable Diffusion Turbo (v1.5/XL)</SelectItem>
                          <SelectItem value="hyper-sdxl">Hyper SDXL</SelectItem>
                          <SelectItem value="flux1-dev">FLUX.1 [dev]</SelectItem>
                          <SelectItem value="flux1-schnell">FLUX.1 [schnell]</SelectItem>
                          <SelectItem value="flux1-pro">FLUX.1 [pro]</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emoteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emote Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select emote type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pixel">Pixel</SelectItem>
                          <SelectItem value="kawaii">Kawaii</SelectItem>
                          <SelectItem value="object">Object</SelectItem>
                          <SelectItem value="cute-bold-line">Cute Bold Line</SelectItem>
                          <SelectItem value="text-based">Text Based</SelectItem>
                          <SelectItem value="3d-based">3D Based</SelectItem>
                          <SelectItem value="pepe-based">Pepe Based</SelectItem>
                          <SelectItem value="sticker-based">Sticker Based</SelectItem>
                          <SelectItem value="chibi">Chibi</SelectItem>
                          <SelectItem value="meme">Meme</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input placeholder="A space invader" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader className="animate-spin" /> : "Generate"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 gap-4">
            {photos.map((url, index) => (
              <div key={index} className="relative w-[250px] h-[250px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border">
                <Image src={url} alt={`Generated emote ${index}`} className="object-cover w-full h-full" fill/>
                <button
                  onClick={() => editor?.addGeneratedEmote(url)} // Add to canvas on click
                  className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition bg-black bg-opacity-50 flex items-center justify-center text-white"
                >
                  Add to Canvas
                </button>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};