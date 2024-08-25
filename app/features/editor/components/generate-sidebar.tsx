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
import { FileUpload } from "@/components/FileUpload";
import { SaveAll } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  prompt: z.string().min(2, { message: "Prompt must be at least 2 characters." }),
  amount: z.string().default("1"),
  resolution: z.string().default("512x512"),
  emoteType: z.string().default("chibi"),
  model: z.string().default("DALL-E 3"),
  image: z.string().optional(), // Add image field to the schema
});

interface EmoteGeneratorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const EmoteGeneratorSidebar = ({ activeTool, onChangeActiveTool, editor }: EmoteGeneratorSidebarProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      emoteType: "chibi",
      model: "DALL-E 3"
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Submitting with emoteType:", data.emoteType);

      const selectedModel = generation.models.find(model => model.name === data.model);
      if (!selectedModel) {
        throw new Error("Selected model not found");
      }

      const response = await axios.post(selectedModel.apiRoute, {
        prompt: data.prompt,
        amount: parseInt(data.amount),
        resolution: data.resolution,
        emoteType: data.emoteType,
        image: uploadedImage,
      });

      let imageUrls: string[] = [];

      if (response.data.images && Array.isArray(response.data.images)) {
        imageUrls = response.data.images.map((image: any) => image.url);
      } else if (typeof response.data === 'string') {
        imageUrls = [response.data];
      } else {
        throw new Error("Unexpected response format");
      }

      setPhotos(imageUrls);

      // Automatically save each generated image
      for (const imageUrl of imageUrls) {
        await handleSave(imageUrl, data.prompt, userId || '', data.emoteType, data.model);
      }

      toast.success('Emotes generated and saved successfully!');
    } catch (error) {
      console.error("Error generating images:", error);
      toast.error('Failed to generate or save emotes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (imageUrl: string, prompt: string, userId: string, emoteType: string, model: string) => {
    try {
    const saveResponse = await axios.post('/api/saveemote', {
        userId: userId,
        prompt,
        imageUrl,
        style: emoteType,
        model: model
      });
      console.log(saveResponse.data);
    } catch (error) {
      console.error('Failed to save emote:', error);
      throw error; // Propagate the error to be handled in onSubmit
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
              {/* <Sparkle className="w-4 h-4 ml-2" /> */}
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
              {/* Add this section within your form */}
              {uploadedImage ? (
                <div className="flex flex-col items-center">
                  <Image src={uploadedImage} alt="Uploaded Image" width={200} height={200} className="object-cover rounded-lg" />
                  <Button onClick={() => setUploadedImage(null)} className="mt-2">Remove Image</Button>
                </div>
              ) : (
                <AccordionItem value="uploadImage">
                  <AccordionTrigger>Upload Image</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col items-center">
                      <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <FileUpload onChange={(url) => setUploadedImage(url ?? null)} endpoint="imageUploader" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader className="animate-spin" /> : "Generate Emote (1 Credit)"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 gap-4 grid grid-cols-2">
          {photos && photos.length > 0 && photos.map((url, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-[125px] h-[125px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border">
                <Image src={url} alt={`Generated emote ${index}`} className="object-cover w-full h-full" fill />
                <button
                  onClick={() => editor?.addGeneratedEmote(url)}
                  className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition bg-black bg-opacity-50 flex items-center justify-center text-white"
                >
                  Add to Canvas
                </button>
              </div>
              {/* <Button onClick={() => handleSave(url, form.getValues().prompt, userId || '')} variant="secondary" className="mt-2 w-full">
                <SaveAll className="h-4 w-4 mr-2" />
                Save
              </Button> */}
            </div>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
    </aside>
  );
};