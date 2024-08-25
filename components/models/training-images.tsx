'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { FileUpload } from "@/components/FileUpload"; // Import FileUpload component
import Image from "next/image";
import { Emote } from "@prisma/client"; // Import Emote type
import { useState } from "react";

interface TrainingImagesProps {
  emotes: Emote[];
  images: string[];
  onFileChange: (url?: string) => void;
  onEmoteSelect: (imageUrl: string) => void;
  trainingResult: any;
  userId?: string; // Add userId prop
}

export default function TrainingImages({ emotes, images, onFileChange, onEmoteSelect, trainingResult, userId }: TrainingImagesProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const [selectedItem, setSelectedItem] = useState(''); // State to store the selected dropdown item

  // Dummy data for dropdown items
  const dropdownItems = ['Option 1', 'Option 2', 'Option 3'];

  // Function to handle dropdown selection
  const handleDropdownSelect = (item: string) => {
    setSelectedItem(item);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  console.log("Received emotes prop:", emotes); // Debugging line

  return (
    <div className="w-2/3">
      <h2 className="text-xl font-bold mb-4">Your Emotes</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-2">
        {emotes?.map((emote: Emote) => (
          <div 
            key={emote.id} 
            className="relative w-[100px] h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
            onClick={() => onEmoteSelect(emote.imageUrl!)} // Add click handler
          >
            <Image
              fill
              src={emote.imageUrl!}
              alt={emote.id}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold my-4">Training Images</h2>
      {/* <Button variant="outline" className="w-full mb-4 text-black">
        Select from Library
      </Button> */}
      {/* <FileUpload onChange={onFileChange} endpoint="imageUploader" /> */}
      <div className="mt-6">
        <p>Dataset: {images.length} image{images.length !== 1 ? 's' : ''}</p>
        <div className="h-4 bg-[#242424] rounded-full mt-2">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${images.length / 15 * 100}%` }}></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Min: 5</span>
          <span>Max: 15</span>
        </div>
        {/* Display uploaded images in a grid with 5 images per row */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <div key={index} className="col-span-1">
              <Image src={image} alt={`Uploaded ${index + 1}`} className="object-cover" width={1000} height={1000}/>
            </div>
          ))}
        </div>
      </div>
      {/* Display training result */}
      {trainingResult && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">Training Result</h3>
          <pre>{JSON.stringify(trainingResult, null, 2)}</pre>
        </div>
      )}
      {/* Dropdown Toggle Button */}
      {/* <Button onClick={toggleDropdown} className="bg-gray-500 text-white mt-4">Options</Button> */}
      {/* Dropdown Menu */}
      {dropdownVisible && (
        <div className="relative w-full">
          <div className="absolute bg-white shadow-lg mt-2 rounded-lg w-full z-10 text-black">
            {dropdownItems.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropdownSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}