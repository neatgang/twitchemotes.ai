"use client"

import { createContext, useState, ReactNode } from "react";

interface ImageContextProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  resultImage: string | null;
  setResultImage: (image: string | null) => void;
}

export const ImageContext = createContext<ImageContextProps>({
  uploadedImage: null,
  setUploadedImage: () => {},
  resultImage: null,
  setResultImage: () => {},
});

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  return (
    <ImageContext.Provider value={{ uploadedImage, setUploadedImage, resultImage, setResultImage }}>
      {children}
    </ImageContext.Provider>
  );
};