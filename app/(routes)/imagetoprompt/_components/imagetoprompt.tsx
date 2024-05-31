/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SXANqmUefgz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LogOutIcon, SettingsIcon, SmileIcon, UploadIcon } from "lucide-react"
import { FileUpload } from "@/components/FileUpload"
import { useForm } from "react-hook-form"
import { formSchema } from "../constants"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Image from "next/image"

export default function ImageToPrompt() {

    const [photos, setPhotos] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        // prompt: "",
        // amount: "1",
        // resolution: "512x512",
        imageUrl: ""
        // templates: "prompt" // Default to the first template
      }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        setPhotos([]);
  
        const response = await axios.post('/api/vision', values);
  
        const urls = response.data.map((image: { url: string }) => image.url);
  
        setPhotos(urls);
      } catch (error: any) {
        if (error?.response?.status === 403) {
          // proModal.onOpen();
        } else {
          // toast.error("Something went wrong.");
        }
      } finally {
      //   router.refresh();
      }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* <header className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <SmileIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">EmoteMaker.ai</span>
          </Link>
          <nav className="ml-8 hidden md:flex space-x-4">
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              prefetch={false}
            >
              Profile
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              prefetch={false}
            >
              Marketplace
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              prefetch={false}
            >
              Journaling
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              prefetch={false}
            >
              Support
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <img src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <img src="/placeholder.svg" alt="User Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                  <SettingsIcon className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header> */}
            <main className="flex-1">
                <div className="w-full max-w-4xl mx-auto py-12 md:py-20">
                    <div className="space-y-6 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">Generate Prompts from an Image</h1>
                        <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 md:text-xl">
                            Easily turn your images into custom prompts using AI.
                        </p>
                    </div>
                    <div className="mt-12 space-y-8">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 md:p-8">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="w-full max-w-md">
                                    <div>
                                        {/* <div className="flex flex-col items-center justify-center space-y-2 py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                                            <UploadIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                            <p className="text-gray-500 dark:text-gray-400">Drag and drop your image here</p>
                                        </div> */}
                                        <FileUpload 
                                             endpoint="imageUploader"
                                             onChange={(url) =>{
                                               if (url) {
                                                 onSubmit({
                                                   imageUrl: url
                                                 })
                                               }
                                             }}
                                        />
                                    </div>
                                    {/* <Button variant="outline" size="sm" className="mt-4">
                                        Upload Image
                                    </Button> */}
                                <Button className="w-full max-w-md">Analyze Image and Generate Prompt</Button>
                            </div>
                                </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 md:p-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Generated Prompt</h2>
                                <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        A close-up shot of a cute, fluffy golden retriever puppy with big, expressive eyes and a playful
                                        expression, looking directly at the camera.
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                "A close-up shot of a cute, fluffy golden retriever puppy with big, expressive eyes and a playful expression, looking directly at the camera.",
                                            )
                                        }
                                    >
                                        Copy Prompt
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 md:p-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Credits and Subscription Info</h2>
                <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">
                    Image analysis and prompt generation will use 5 credits. You have 95 credits remaining.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                  >
                    Upgrade Subscription
                  </Link>
                </div>
              </div>
            </div> */}
                    </div>
                </div>
            </main>
        </div>
    )
}


