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
import axios, { AxiosResponse } from "axios";
import { Loader } from "lucide-react";
import { ActiveTool, Editor, generation } from "../types";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Import Accordion components

const formSchema = z.object({
  prompt: z.string().min(2, { message: "Prompt must be at least 2 characters." }),
  amount: z.string().default("1"),
  resolution: z.string().default("512x512"),
  emoteType: z.string().default("default"),
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

  // const onSubmit = async (data: z.infer<typeof formSchema>) => { // works with dalle 3
  //   setIsLoading(true);
  //   try {
  //     const selectedModel = generation.models.find(model => model.name === data.model);
  //     if (!selectedModel) {
  //       throw new Error("Selected model not found");
  //     }

  //     const response = await axios.post(selectedModel.apiRoute, {
  //       prompt: data.prompt,
  //       amount: data.amount,
  //       resolution: data.resolution,
  //       emoteType: data.emoteType,
  //     });

  //     const imageUrls = response.data.images;
  //     setPhotos(imageUrls);
  //   } catch (error) {
  //     console.error("Error generating images:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const onSubmit = async (data: z.infer<typeof formSchema>) => { // works with FAL model
  //   setIsLoading(true);
  //   try {
  //     const selectedModel = generation.models.find(model => model.name === data.model);
  //     if (!selectedModel) {
  //       throw new Error("Selected model not found");
  //     }

  //     const response = await axios.post(selectedModel.apiRoute, data);
  //     const photosArray = response.data.images; // Extract URLs from response
  //     setPhotos(photosArray);
  //   } catch (error) {
  //     console.error('Error generating emotes:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const selectedModel = generation.models.find(model => model.name === data.model);
      if (!selectedModel) {
        throw new Error("Selected model not found");
      }

      let response;
      if (selectedModel.apiRoute.includes("fal")) {
        response = await axios.post(selectedModel.apiRoute, {
          prompt: data.prompt,
          // image_size: data.resolution,
          // num_images: parseInt(data.amount),
          // emoteType: data.emoteType,
        });
      } else if (selectedModel.apiRoute.includes("dalle")) {
        const finalPrompt = `Design a single, vibrant, cartoonish digital emote suitable for use on a Twitch streamer's channel. The emote should depict ${data.prompt}, ensuring expressiveness and visibility at a small scale. It should feature exaggerated facial features appropriate for the ${data.prompt}, conveying a specific emotion like excitement or surprise. The background should have a solid white background. The style should be playful and friendly, with a distinct, cohesive look that could easily be part of a larger set of emotes.`;
        response = await axios.post(selectedModel.apiRoute, {
          prompt: finalPrompt,
          amount: parseInt(data.amount),
          resolution: data.resolution,
        });
      }

      console.log("response", response);

      let imageUrls: string[] = [];
      if (selectedModel.apiRoute.includes("fal")) {
        // Handle FAL API response
        if (response?.data?.images) {
          imageUrls = response.data.images.map((image: { url: string }) => image.url);
        }
      } else if (selectedModel.apiRoute.includes("dalle")) {
        // Handle DALL-E API response
        if (response?.data?.data) {
          imageUrls = response.data.data.map((image: { url: string }) => image.url);
        }
      }

      if (imageUrls.length > 0) {
        setPhotos(imageUrls);
      } else {
        throw new Error("No images found in the response");
      }
    } catch (error) {
      console.error("Error generating images:", error);
      // You might want to set an error state here and display it to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "emote-generator" ? "visible" : "hidden")}>
      <ToolSidebarHeader title="Generate Emotes" description="Generate emotes from a prompt" />
      <ScrollArea className="p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
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
            <Accordion type="single" collapsible>
              <AccordionItem value="model">
                <AccordionTrigger>Model</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              {generation.models.map((model) => (
                                <SelectItem key={model.name} value={model.name}>
                                  {model.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="emoteType">
                <AccordionTrigger>Emote Type</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="emoteType"
                    render={({ field }) => (
                      <FormItem>
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
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amount">
                <AccordionTrigger>Number of Emotes</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select number of emotes" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader className="animate-spin" /> : "Generate"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 gap-4">
          {photos && photos.length > 0 && photos.map((url, index) => ( // Add conditional check
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
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
    </aside>
  );
};