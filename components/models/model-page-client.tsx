"use client"

import ModelSidebar from "@/components/models/model-sidebar";
import TrainingImages from "@/components/models/training-images";
import { Emote } from "@prisma/client"; // Import Emote type
import { useState } from 'react'; // Import useState
import axios from 'axios'; // Import axios
import { useUser } from "@clerk/nextjs"; // Import useUser hook from Clerk

interface ModelPageClientProps {
  initialEmotes: Emote[];
}

export default function ModelPageClient({ initialEmotes }: ModelPageClientProps) {
  const { user } = useUser(); // Use the useUser hook to get the current user
  const userId = user?.id; // Extract the userId

  const [images, setImages] = useState<string[]>([]); // State to store uploaded images URLs
  const [trainingResult, setTrainingResult] = useState(null); // State to store training result
  const [emotes, setEmotes] = useState<Emote[]>(initialEmotes); // State to store emotes

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
      const response = await axios.post('/api/models/train', {
        userId, // Include userId in the request
        images_data_url: images, // Assuming images is an array of URLs
        steps: 1000,
        rank: 16,
        learning_rate: 0.0004,
        experimental_optimizers: "adamw8bit",
        experimental_multi_checkpoints_count: 1,
      });

      setTrainingResult(response.data);
    } catch (error) {
      console.error("Error during training:", error);
    }
  };

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