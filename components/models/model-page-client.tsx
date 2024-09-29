"use client"

import ModelSidebar from "@/components/models/model-sidebar";
import TrainingImages from "@/components/models/training-images";
import { Emote } from "@prisma/client"; // Import Emote type
import { useState } from 'react'; // Import useState
import axios from 'axios'; // Import axios
import { useUser } from "@clerk/nextjs"; // Import useUser hook from Clerk
import * as fal from "@fal-ai/serverless-client";
import JSZip from 'jszip';

// Add this type definition
type TrainingStatus = 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'IN_PROGRESS' | 'IN_QUEUE';

interface ModelPageClientProps {
  initialEmotes: Emote[];
}

export default function ModelPageClient({ initialEmotes }: ModelPageClientProps) {
  const { user } = useUser(); // Use the useUser hook to get the current user
  const userId = user?.id; // Extract the userId

  const [images, setImages] = useState<string[]>([]); // State to store uploaded images URLs
  const [trainingResult, setTrainingResult] = useState<unknown>(null); // State to store training result
  const [emotes, setEmotes] = useState<Emote[]>(initialEmotes); // State to store emotes
  const [trainingStatus, setTrainingStatus] = useState<string | null>(null);

  // Function to handle file upload changes
  const handleFileChange = (url?: string) => {
    if (url) {
      setImages(prevImages => [...prevImages, url]);
    }
    console.log("Uploaded file URL:", url);
  };

  // Function to handle emote selection
  const handleEmoteSelect = (imageUrl: string) => {
    setImages(prevImages => [...prevImages, imageUrl]);
  };

  // Function to handle training
  const handleTraining = async () => {
    try {
      setTrainingStatus('Training started');

      console.log("Image URLs:", images);

      // Create a zip file containing the images
      const zip = new JSZip();
      const imagePromises = images.map(async (imageUrl, index) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        zip.file(`image_${index}.jpg`, blob);
      });

      await Promise.all(imagePromises);
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Create a FormData object to send the zip file
      const formData = new FormData();
      formData.append('images_zip', zipBlob, 'training_images.zip');

      // Send the zip file to the server for processing
      const response = await axios.post('/api/models/fal/train', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Training response:", response.data);

      const { request_id } = response.data;

      const checkStatus = async () => {
        try {
          const statusResponse = await axios.get(`/api/models/fal/status?requestId=${request_id}`);
          console.log("Status response:", statusResponse.data);

          const { status, result } = statusResponse.data;

          if (status === 'COMPLETED') {
            setTrainingResult(result);
            setTrainingStatus('Training completed');
          } else if (status === 'FAILED' || status === 'CANCELLED') {
            setTrainingStatus(`Training ${status.toLowerCase()}`);
          } else if (status === 'IN_PROGRESS' || status === 'IN_QUEUE') {
            setTrainingStatus(`Training ${status.toLowerCase().replace('_', ' ')}`);
            setTimeout(checkStatus, 5000); // Check again in 5 seconds
          } else {
            setTrainingStatus(`Unknown status: ${status}`);
          }
        } catch (error) {
          console.error("Error checking status:", error);
          if (axios.isAxiosError(error) && error.response) {
            console.error("Error response data:", error.response.data);
          }
          setTrainingStatus('Error occurred while checking status');
        }
      };

      checkStatus();
    } catch (error) {
      console.error("Error during training:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
      }
      setTrainingStatus('Error occurred during training');
    }
  };

  fal.config({
    proxyUrl: "/api/fal/proxy",
  });

  const handleClearImages = () => {
    setImages([]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  console.log('handleRemoveImage:', handleRemoveImage); // Add this line

  return (
    <div className="p-4 lg:p-6 h-full">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <ModelSidebar onStartTraining={handleTraining} userId={userId} />
        <TrainingImages
          emotes={emotes} 
          images={images} 
          onFileChange={handleFileChange} 
          onEmoteSelect={handleEmoteSelect} 
          onClearImages={handleClearImages}
          onRemoveImage={handleRemoveImage}
          trainingResult={trainingResult}
          userId={userId}
        />
      </div>
    </div>
  );
}