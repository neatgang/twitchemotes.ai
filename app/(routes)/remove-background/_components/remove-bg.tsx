"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
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
          const response = await axios.post('/api/replicate/bg-remove', { image: reader.result });
          console.log('API Response:', response.data); // Log the response
          if (response.data && response.data) {  // Assuming the server returns an object with a 'url' property
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImageData({
      original: URL.createObjectURL(file),
      processed: ''
    });
  };

  const handleRemoveBg = async () => {
    if (imageData && imageData.original) {
      setIsProcessing(true);
      try {
        const response = await axios.post('/api/replicate/bg-remove', { image: imageData.original });
        console.log('API Response:', response.data); // Log the response
        if (response.data && response.data) {  // Adjusted to check for 'url' in response
          setImageData(prev => {
            if (prev === null) return null;
            return {
              ...prev,
              processed: response.data  // Update to use 'url' from response
            };
          });
          setResult(response.data);
          toast.success("Background updated successfully!");
        } else {
          toast.error("Failed to update background.");
        }
      } catch (error) {
        console.error('Error updating background:', error);
        toast.error("Error updating background.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full px-4 py-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Image Background Remover</h1>
          <div
            className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center ${
              imageData ? "border-blue-500" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {imageData ? (
              <Image
                src={imageData.original}
                alt="Uploaded Image"
                width={400}
                height={400}
                className="object-contain mb-4"
              />
            ) : (
              <div className="text-gray-500 text-center items-center">
                {/* <ImageIcon className="w-12 h-12 mb-2" /> */}
                <p>Drop your image here</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isProcessing}
                  className="mt-2"
                />
              </div>
            )}
            {isProcessing && (
              <div className="flex items-center justify-center mt-4">
                {/* <LoaderIcon className="w-6 h-6 mr-2 animate-spin" /> */}
                <span>Processing...</span>
              </div>
            )}
            {result && (
              <div className="mt-4">
                <Image src={result} alt="Result" width={400} height={400} className="object-contain" />
                <Button className="mt-4">
                  {/* <DownloadIcon className="w-4 h-4 mr-2" /> */}
                  Download PNG
                </Button>
              </div>
            )}
          </div>
          {imageData && !isProcessing && !result && (
            <Button className="mt-4" onClick={handleRemoveBg}>
              Remove Background
            </Button>
          )}
        </div>
      </main>
  );
}



export default RemoveBGContainer;