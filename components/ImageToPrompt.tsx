"use client"

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { UploadButton } from "@uploadthing/react"
import { FileUpload } from "./FileUpload"
import { useState } from "react"
import axios from "axios"

export default function ImageToPrompt() {

  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generatePrompt = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/vision', { imageUrl });
  
      // Log response.data
      console.log('response.data:', response.data);
  
      // Assuming the response contains the prompt
      if (response.data.output) {
        // Log response.data.output directly
        console.log('output:', response.data.output);
  
        // Ensure cleanedPrompt is a string
        let cleanedPrompt = response.data.output.toString();
  
        setPrompt(cleanedPrompt);
      }
        
    } catch (error: any) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      {!imageUrl && (
  <div className="grid w-full items-center gap-2">
    <Label htmlFor="image">Image</Label>
    {/* <FileUpload
      onChange={(url) => {
        // Do something with the url
        setImageUrl(url);
      }}
      endpoint="imageUploader" // replace with your endpoint
    /> */}
  </div>
)}
{imageUrl ? (
  <Image
    alt="Uploaded Image"
    className="aspect-square object-cover border border-zinc-200 w-full rounded-lg overflow-hidden dark:border-zinc-800"
    height="150"
    src={imageUrl} // Use the URL of the uploaded image
    width="150"
  />
) : (
  <div>No Image Uploaded</div>
)}
        <Button className="w-full" variant="default" onClick={generatePrompt} disabled={isLoading}>
  {isLoading ? 'Generating...' : 'Generate Prompt'}
</Button>
<Card className="p-4 border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 rounded-lg">
  <p className="text-zinc-900 dark:text-zinc-50 whitespace-pre-wrap overflow-auto" style={{ maxHeight: '100px' }}>{prompt}</p>
  {/* <Button disabled={!prompt} onClick={handleCopy}>Copy</Button> */}
</Card>
      </CardContent>
    </Card>
  )
}