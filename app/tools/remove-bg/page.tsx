
"use client"

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import RemoveBGContainer from "./_components/remove-bg"

export default function ImageToBgRemove() {
  const [imageUrl, setImageUrl] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const removeBackground = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/replicate/bg-remove', { image: imageUrl });
  
      // Log response.data
      console.log('response.data:', response.data);
  
      // Assuming the response contains the result image URL
      if (response.data.result) {
        // Log response.data.result directly
        console.log('result:', response.data.result);
  
        setResultImage(response.data.result);
      }
        
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            Quickly remove the background of your generated emote.
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
          {/* <ImageToPrompt /> */}
          <RemoveBGContainer />
        
      </div>
    </div>

   );
}
 