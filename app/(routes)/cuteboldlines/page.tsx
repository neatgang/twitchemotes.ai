"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon, Wand, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Loader } from "@/components/loader";
// import { Empty } from "@/components/ui/empty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useProModal } from "@/hooks/use-pro-modal";

import { amountOptions, formSchema, resolutionOptions, templates } from "./constants"
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import Empty from "@/components/Empty";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UploadButton } from "@/utils/uploadthing";
import { FileUpload } from "@/components/FileUpload";
import ImageToPrompt from "@/components/ImageToPrompt";
import ChatContainer from "@/components/ChatContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const demophotos = [
  {
    id: 5,
    image: "/asmonemote.png",
  },
  {
    id: 6,
    image: "/quinemote.png",
  },
  {
    id: 7,
    image: "/esfandemote1.png",
  },
  {
    id: 7,
    image: "/tyler1.png",
  },
  {
  id: 1,
  image: "/foxemote1.png",
},
{
  id: 2,
  image: "/elf.png",
},
{
  id: 3,
  image: "/determinedcat.png",
},
{
  id: 4,
  image: "/gamercat.png",
},
];


// const demophotos = ["/foxemote1.png"]; // Add more image paths as needed


const PhotoPage = () => {
//   const proModal = useProModal();
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState("Face");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
      // style: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);
  
      const response = await axios.post('/api/cuteboldlines', { ...values, });
  
      const urls = response.data.map((image: { url: string }) => image.url);
  
      setPhotos(urls);
    } catch (error: any) {
      // Handle error
    }
  }

  return ( 
    <div className="flex flex-col items-center mt-12">
      <div className="text-center px-3 md:px-6 flex items-center gap-x-3 mb-8">
        {/* <div className="p-2 w-fit rounded-md bg-pink-700/10">
          <ImageIcon className="w-10 h-10 text-pink-700" />
        </div> */}
        <div>
          <h2 className="text-5xl font-bold mb-2">
            EmoteMaker.ai
          </h2>
          <p className="text-sm text-muted-foreground">
            Turn your prompt into a cute bold line emote.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-screen-lg">
      {/* <FileUpload 
            endpoint="imageUploader"
            onChange={(url) =>{
              // if (url) {
              //   onSubmit({
              //     imageUrl: url
              //   })
              // }
            }}
          /> */}
          <div className="flex items-center">
          {/* <Tabs defaultValue="Face" onChange={(tabValue) => setSelectedTab(tabValue)}>
  <TabsList>
    <TabsTrigger value="Face">Face Emotes</TabsTrigger>
    <TabsTrigger value="Text">Text Emotes</TabsTrigger>
    <TabsTrigger value="Object">Object Emotes</TabsTrigger>
  </TabsList>
    <TabsContent value="Face"> */}
  <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="
        rounded-lg 
        border 
        w-full 
        p-4 
        px-3 
        md:px-6 
        focus-within:shadow-sm
        grid
        grid-cols-12
        gap-2
      "
    >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-8 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading} 
                      placeholder="A curious kitten" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-start-11 col-span-2 w-full flex justify-center" type="submit" disabled={isLoading} size="icon">
  <Wand2 />
</Button>
          </form>
        </Form>
        {/* </TabsContent>
        <TabsContent value="Text">
  <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="
        rounded-lg 
        border 
        w-full 
        p-4 
        px-3 
        md:px-6 
        focus-within:shadow-sm
        grid
        grid-cols-12
        gap-2
      "
    >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-8 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading} 
                      placeholder="Good game!" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-start-11 col-span-2 w-full flex justify-center" type="submit" disabled={isLoading} size="icon">
  <Wand2 />
</Button>
          </form>
        </Form>
        </TabsContent>
        <TabsContent value="Object">
  <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="
        rounded-lg 
        border 
        w-full 
        p-4 
        px-3 
        md:px-6 
        focus-within:shadow-sm
        grid
        grid-cols-12
        gap-2
      "
    >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-8 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading} 
                      placeholder="A bag of coins" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-start-11 col-span-2 w-full flex justify-center" type="submit" disabled={isLoading} size="icon">
  <Wand2 />
</Button>
          </form>
        </Form>
        </TabsContent>
        </Tabs> */}
        </div>
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
          {photos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  fill
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
      </div>
      {/* <div className="justify-center">
  <h2 className="text-1xl font-bold mb-2">
    Here are some examples of what you can generate:
  </h2>
</div>
      <div className="gap-4 mt-8 mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {demophotos.map((photo, index) => (
  <Card key={index} style={{ position: "relative", width: "200px", height: "200px" }}>
    <Image
      layout="fill"
      objectFit="cover"
      alt={`Demo photo ${photo.id}`}
      src={photo.image} // Use photo.image as the image path
    />
  </Card>
))}
</div> */}
    </div>

   );
}
 
export default PhotoPage;