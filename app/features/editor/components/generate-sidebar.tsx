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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const selectedModel = generation.models.find(model => model.name === data.model);
      if (!selectedModel) {
        throw new Error("Selected model not found");
      }

      const response = await axios.post(selectedModel.apiRoute, data);
      const photosArray = response.data.images.map((image: { url: string }) => image.url); // Extract URLs from response
      setPhotos(photosArray);
    } catch (error) {
      console.error('Error generating emotes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "emote-generator" ? "visible" : "hidden")}>
      <ToolSidebarHeader title="Generate Emotes" description="Generate emotes from a prompt" />
      <ScrollArea className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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