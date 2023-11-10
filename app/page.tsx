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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Loader } from "@/components/loader";
// import { Empty } from "@/components/ui/empty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useProModal } from "@/hooks/use-pro-modal";

import { amountOptions, formSchema, resolutionOptions } from "./constants"
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import Empty from "@/components/Empty";

const demophotos = [
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
]; // Add more image names as needed

// const demophotos = ["/foxemote1.png"]; // Add more image paths as needed

const PhotoPage = () => {
//   const proModal = useProModal();
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);

      const response = await axios.post('/api/dalle', values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setPhotos(urls);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // proModal.onOpen();
      } else {
        // toast.error("Something went wrong.");
      }
    } finally {
    //   router.refresh();
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
            Turn your prompt into an emote.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-screen-lg">
  <Form {...form}>
  {/* <Heading
  title="Image Generation"
  description="Turn your prompt into an image."
  Icon={ImageIcon}
  iconColor="text-pink-700"
  bgColor="bg-pink-700/10"
  className="text-center px-3 md:px-6"
/> */}
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
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading} 
                      placeholder="A happy frog" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            /> */}
            <Button className="col-start-11 col-span-2 w-full flex justify-center" type="submit" disabled={isLoading} size="icon">
  <Wand2 />
</Button>
          </form>
        </Form>
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
      <div className="justify-center">
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
</div>
    </div>

   );
}
 
export default PhotoPage;