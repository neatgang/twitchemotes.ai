import { useCallback, useContext, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { ImageContext } from "@/providers/canvas/ImageContext";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Emote, EmoteForSale } from "@prisma/client";


interface RemoveBackgroundSidebarProps {
  emotes: (Emote & { EmoteForSale?: EmoteForSale | null })[];
}

export default function RemoveBackgroundSidebar({ emotes }: RemoveBackgroundSidebarProps) {
  const { uploadedImage, setUploadedImage, resultImage, setResultImage } = useContext(ImageContext);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }, [setUploadedImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeBackground = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/fal/birefnet-bg-remove', { image: uploadedImage });
      if (response.data.image && response.data.image.url) {
        setResultImage(response.data.image.url); // Update to use the URL from the response
      }
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-80 flex flex-col border-r bg-muted/20">
        <div className="p-4 space-y-4">
          <Label>Input Image</Label>
          <div className="flex flex-col items-center gap-4">
            <Dialog>
              <DialogTrigger className="w-full">
                <Button className="w-full">
                  Select from Library
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <h2 className="text-lg font-medium">Select an Emote</h2>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
                  {emotes.map((emote) => (
                    <Card key={emote.id} className="group">
                      <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                        <Image
                          alt="Emote"
                          className="w-full h-full object-contain"
                          height={128}
                          src={emote.imageUrl || "/placeholder.png"}
                          style={{
                            aspectRatio: "128/128",
                            objectFit: "cover",
                          }}
                          width={128}
                        />
                      </CardContent>
                      <CardFooter className="pt-4">
                        <div className="flex flex-col items-start">
                          <h2 className="text-xs text-gray-500 dark:text-gray-400">
                            Prompt: {emote.prompt}
                          </h2>
                          <Button onClick={() => setUploadedImage(emote.imageUrl || '')} variant="secondary" className="w-full mt-2">
                            Select
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {!resultImage ? (
              <div 
                {...getRootProps()} 
                className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center ${
                  isDragActive ? 'border-blue-500' : ''
                }`}
              >
                <input {...getInputProps()} />
                {uploadedImage ? (
                  <Image src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" width={500} height={500}/>
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
            ) : (
              <div className="relative w-full h-48">
                <Image src={resultImage} alt="Result" layout="fill" objectFit="cover" />
              </div>
            )}
          </div>
        </div>
        <div className="p-4 space-y-4">
          <Button className="w-full" onClick={removeBackground} disabled={isLoading}>
            {isLoading ? 'Removing...' : 'Remove Background'}
          </Button>
        </div>
      </div>
    </div>
  )
}