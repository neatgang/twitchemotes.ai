import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ImageData = {
  original: string;
  processed: string;
};

function RemoveBGContainer() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          setIsProcessing(true);
          // const response = await axios.post('/api/replicate/bg-remove', { image: reader.result });
          const response = await axios.post('/api/fal/birefnet-bg-remove', { image: reader.result });
          if (response.data && response.data) {
            setImageData({
              original: URL.createObjectURL(file),
              processed: response.data
            });
            setResult(response.data);
            toast.success("Background removed successfully!");
          } else {
            toast.error("Failed to process image.");
          }
        } catch (error) {
          console.error('Error processing image:', error);
          toast.error("Error processing image.");
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!imageData || !imageData.processed) {
      toast.error("No processed image to save.");
      return;
    }

    try {
      const response = await axios.post('/api/saveemote', {
        imageUrl: imageData.processed
      });

      if (response.status === 200) {
        toast.success("Image saved successfully!");
      } else {
        toast.error("Failed to save image.");
      }
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error("Error saving image.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isProcessing}
        className="mb-4"
      />
      {imageData && (
        <Card className="rounded-lg overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={imageData.processed || imageData.original}
              alt="Uploaded Image"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
          <CardFooter className="p-2 flex flex-col gap-2">
            {/* <Button onClick={() => {}} disabled={isProcessing} className="w-full flex">

              <span className="h-4 w-4 mr-2">🖌️</span>
              Remove Background
            </Button> */}
            <Button onClick={() => window.open(imageData.processed || imageData.original)} variant="secondary" className="w-full">
              {/* Assuming you have an icon component */}
              <span className="h-4 w-4 mr-2">⬇</span>
              Download
            </Button>
            <Button onClick={() => {/* save logic */}} variant="secondary" className="w-full">
              {/* Assuming you have an icon component */}
              <span className="h-4 w-4 mr-2">💾</span>
              Save
            </Button>
          </CardFooter>
        </Card>
      )}
      {isProcessing && (
        <div className="flex items-center justify-center mt-4">
          <span>Processing...</span>
        </div>
      )}
    </div>
  );
}

export default RemoveBGContainer;