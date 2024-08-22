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
import { Loader, Sparkle } from "lucide-react";
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
import { generateThemedEmotePrompt } from "../utils";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  prompt: z.string().min(2, { message: "Prompt must be at least 2 characters." }),
  amount: z.string().default("1"),
  resolution: z.string().default("512x512"),
  emoteType: z.string().default("chibi"),
  model: z.string().default("DALL-E 3")
});

interface EmoteGeneratorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const EmoteGeneratorSidebar = ({ activeTool, onChangeActiveTool, editor }: EmoteGeneratorSidebarProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState(""); // Add state for enhanced prompt

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      // resolution: "512x512",
      emoteType: "chibi",
      model: "DALL-E 3"
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Ensure the correct theme is being sent
      console.log("Submitting with emoteType:", data.emoteType); // Add this line to debug

      const selectedModel = generation.models.find(model => model.name === data.model);
      if (!selectedModel) {
        throw new Error("Selected model not found");
      }

      const response = await axios.post(selectedModel.apiRoute, {
        prompt: data.prompt,
        amount: parseInt(data.amount),
        resolution: data.resolution, // Ensure resolution is included if it's part of the request
        emoteType: data.emoteType,
      });

      // Check if the response is from the FAL API and has an 'images' array
      if (response.data.images && Array.isArray(response.data.images)) {
        // Extract URLs from the 'images' array
        const imageUrls = response.data.images.map((image: any) => image.url);
        setPhotos(imageUrls);
      } else if (typeof response.data === 'string') {
        // Direct URL string from the DALL-E API
        setPhotos([response.data]);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to enhance the prompt
  const enhancePrompt = async () => {
    const currentPrompt = form.getValues("prompt");
    setIsLoading(true); // Reuse the existing loading state
    try {
      const response = await axios.post('/api/models/chat-completion', { prompt: currentPrompt });
      if (response.data && response.data.enhancedPrompt) {
        form.setValue("prompt", response.data.enhancedPrompt);
        // setEnhancedPrompt(response.data.enhancedPrompt); // Update enhanced prompt state
        // console.log("Enhanced Prompt:", response.data.enhancedPrompt); // Debugging: Log the enhanced prompt
      }
    } catch (error) {
      console.error("Error enhancing prompt:", error);
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
                    <Textarea placeholder="A space invader" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Conditionally render the enhanced prompt textarea */}
            {enhancedPrompt && (
              <>
              <p className="text-sm text-muted-foreground">Enhanced Prompt</p>
              <Textarea readOnly value={enhancedPrompt} className="mt-2" placeholder="Enhanced prompt will appear here." />
              </>
            )}
            <Button onClick={enhancePrompt} disabled={isLoading} className="mt-2 w-full">
              {isLoading ? <Loader className="animate-spin" /> : "Enhance Prompt (1 Credit)"}
              <Sparkle className="w-4 h-4 ml-2" />
            </Button>
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
                              <SelectItem value="ghibli">Ghibli</SelectItem>
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
              {isLoading ? <Loader className="animate-spin" /> : "Generate Emote (1 Credit)"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 gap-4 grid grid-cols-2">
          {photos && photos.length > 0 && photos.map((url, index) => (
            <div key={index} className="relative w-[125px] h-[125px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border grid grid-cols-4">
              <Image src={url} alt={`Generated emote ${index}`} className="object-cover w-full h-full" fill />
              <button
                onClick={() => editor?.addGeneratedEmote(url)}
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