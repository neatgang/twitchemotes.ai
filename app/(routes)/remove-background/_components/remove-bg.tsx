"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

type ImageData = {
  original: string;
  processed: string;
};

function RemoveBGContainer() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  // const removeBackground = async () => {
  //   if (imageData && imageData.original) {
  //     setIsProcessing(true);
  //     try {
  //       const response = await axios.post('/api/replicate/bg-remove', { image: imageData.original });
  //       console.log('API Response:', response.data); // Log the response
  //       if (response.data && response.data.url) {  // Adjusted to check for 'url' in response
  //         setImageData(prev => {
  //           if (prev === null) return null;
  //           return {
  //             ...prev,
  //             processed: response.data.url  // Update to use 'url' from response
  //           };
  //         });
  //         toast.success("Background updated successfully!");
  //       } else {
  //         toast.error("Failed to update background.");
  //       }
  //     } catch (error) {
  //       console.error('Error updating background:', error);
  //       toast.error("Error updating background.");
  //     } finally {
  //       setIsProcessing(false);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isProcessing}
      />
      {isProcessing && <p>Processing...</p>}
      {imageData && (
        <div className="flex gap-4 mt-4">
          <div>
            <h5>Original</h5>
            <Image src={imageData.original} alt="Original Image" width={250} height={250} />
          </div>
          <div>
            <h5>Processed</h5>
            <Image src={imageData.processed} alt="Processed Image" width={250} height={250} />
            {/* <button onClick={removeBackground} disabled={isProcessing}>
              Update Background
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default RemoveBGContainer;