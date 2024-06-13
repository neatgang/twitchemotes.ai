"use client"

import {
  Download,
  Loader,
  Paintbrush2,
  SaveAll,
    Wand2,
  } from "lucide-react"
  
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { emoteTypes, formSchema } from "@/types/types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Empty from "@/components/Empty"
import { Card, CardFooter } from "@/components/ui/card"
import Image from "next/image"
  
export function OldPlayground() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

      description: "",
    }
  });

  const { control, handleSubmit, watch } = form;
  const emoteType = watch("emoteType");

  useEffect(() => {
    console.log("Emote Type changed to:", emoteType);
  }, [emoteType]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setPhotos([]);
    try {
      const response = await axios.post('/api/generate', values);
      const urls = response.data.map((image: { url: string }) => image.url);
      setPhotos(urls);
      toast.success('Emote generated successfully!');
    } catch (error) {
      toast.error('Failed to generate emote. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid w-full">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6">
                <div className="grid gap-6 rounded-lg border p-4">
                  <p className="-ml-1 px-1 text-sm font-medium">Settings</p>
                  <div className="grid gap-3">
  <Label htmlFor="prompt">Emote Type</Label>
  <FormField 
    control={form.control} 
    name="emoteType"           
    render={({ field }) => (
      <Select {...field}>
        <SelectTrigger id="emoteType">
          <SelectValue placeholder="Select an emote type" />
        </SelectTrigger>
        <SelectContent>
          {emoteTypes.map((type) => (
            <SelectItem key={type.finalPrompt} value={type.finalPrompt}>
              <div className="flex items-start gap-3 text-muted-foreground">
                <p className="font-medium text-foreground">{type.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  />
</div>
                  <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Describe the emote..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
                  <Button className="w-full flex justify-center" type="submit" disabled={isLoading} size="icon">
                    <p className="mr-2">Generate</p>
                    <Wand2 />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">Output</Badge>
            <div className="flex-1" />
            {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {photos.length === 0 && !isLoading && (
                        <Empty label="No images generated." />
        )}
        <div className="gap-4 mt-8 mb-8">
        {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
        {photos.map((src, index) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
              <Image
  fill
  alt="Generated"
  // src={src && src.startsWith('data:image') ? src : `data:image/jpeg;base64,${src}`}
  src={src}
/>
              </div>
              <CardFooter className="p-2 flex flex-col gap-2">
              {/* <Button onClick={() => removeBackground(src, index)} disabled={isRemovingBackground} className="w-full flex">
  {isRemovingBackground ? (
    <Loader /> // Replace with your actual loading spinner component
  ) : (
    <>
      <Paintbrush2 className="h-4 w-4 mr-2" />
      Remove Background
    </>
  )}
</Button> */}
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                {/* <Button onClick={() => handleSave(src, form.getValues().prompt, userId || '')} variant="secondary" className="w-full">
  <SaveAll className="h-4 w-4 mr-2" />
  Save
</Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
          </div>
        </main>
      </div>
    </div>
  );
}
  