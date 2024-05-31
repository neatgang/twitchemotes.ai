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

import { amountOptions, formSchema, resolutionOptions, templates } from "./constants"
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import Empty from "@/components/Empty";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UploadButton } from "@/utils/uploadthing";
import { FileUpload } from "@/components/FileUpload";
import ChatContainer from "@/components/ChatContainer";
import ImageToPrompt from "./_components/imagetoprompt";

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
      // prompt: "",
      // amount: "1",
      // resolution: "512x512",
      imageUrl: ""
      // templates: "prompt" // Default to the first template
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);

      const response = await axios.post('/api/vision', values);

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
    <div className="flex flex-col items-center">
      <div className="text-center px-3 md:px-6 flex items-center gap-x-3">
        {/* <div className="p-2 w-fit rounded-md bg-pink-700/10">
          <ImageIcon className="w-10 h-10 text-pink-700" />
        </div> */}
        {/* <div>
          <h2 className="text-5xl font-bold mb-2">
            EmoteMaker.ai
          </h2>
          <p className="text-sm text-muted-foreground">
            Turn a picture of yourself into a prompt that you can use to generate emotes.
          </p>
        </div> */}
      </div>
      <div className="mx-auto">
      {/* <FileUpload 
            endpoint="imageUploader"
            onChange={(url) =>{
              if (url) {
                onSubmit({
                  imageUrl: url
                })
              }
            }}
          /> */}
          {/* <ImageToPrompt /> */}
          <ImageToPrompt />
          {/* <ChatContainer /> */}
        
      </div>
    </div>

   );
}
 
export default PhotoPage;