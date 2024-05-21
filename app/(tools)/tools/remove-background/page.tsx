import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react";
import { getEmotes } from "@/actions/get-emotes";
import { auth } from "@clerk/nextjs";
import EmoteDisplay from "./_components/DisplayEmotes";
import useEmotes from "@/hooks/useEmotes";
import { TrashIcon, UploadIcon } from "lucide-react";
import { db } from "@/lib/db";
import ImagePreview from "./_components/ImagePreview";

interface Emote {
    id: string;
    prompt: string | null;
    imageUrl: string | null;
    userId: string | null;
    createdAt: Date;
  }

const RemoveBackgroundPage = async () => {

    const { userId } = auth()

    const emotes = await db.emote.findMany({
        where: {
          userId: userId,
        },
        include: {
            emoteForSale: true,
        },
        orderBy: {
          createdAt: "desc",
        }
      });


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Create Your Emote</h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Button className="flex-1" size="lg" variant="default">
                <UploadIcon className="w-5 h-5 mr-2" />
                Upload Image
              </Button>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center h-32 cursor-pointer">
                <span className="text-gray-500 dark:text-gray-400">Drag and drop your image here</span>
              </div>
            </div>
            {/* <div className="bg-white dark:bg-gray-900 rounded-lg p-4 flex flex-col gap-4">
              <h2 className="text-lg font-bold">Image Preview</h2>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  alt="Emote Preview"
                  className="w-full h-full mt-2"
                  height={640}
                  src="/placeholder.svg"
                //   style={{
                //     aspectRatio: "640/360",
                //     objectFit: "cover",
                //   }}
                  width={640}
                />
              </div>
              <Button size="sm" variant="outline">
                <TrashIcon className="w-4 h-4 mr-2" />
                Remove Background
              </Button>
            </div> */}
            <ImagePreview />
            {/* <div className="bg-white dark:bg-gray-900 rounded-lg p-4 flex flex-col gap-4">
              <h2 className="text-lg font-bold">Edit Emote</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button size="sm" variant="outline">
                  <ZoomInIcon className="w-4 h-4 mr-2" />
                  Zoom
                </Button>
                <Button size="sm" variant="outline">
                  <Rotate3dIcon className="w-4 h-4 mr-2" />
                  Rotate
                </Button>
                <Button size="sm" variant="outline">
                  <LightbulbIcon className="w-4 h-4 mr-2" />
                  Brightness
                </Button>
                <Button size="sm" variant="outline">
                  <ContrastIcon className="w-4 h-4 mr-2" />
                  Contrast
                </Button>
                <Button size="sm" variant="outline">
                  <SatelliteIcon className="w-4 h-4 mr-2" />
                  Saturation
                </Button>
                <Button size="sm" variant="outline">
                  <WallpaperIcon className="w-4 h-4 mr-2" />
                  Background
                </Button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-bold">My Emotes</h2>
          <EmoteDisplay emotes={emotes} />
        </div>
      </main>
      {/* <footer className="bg-gray-100 dark:bg-gray-800 py-6 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2" href="#">
            <SmileIcon className="w-6 h-6" />
            <span className="text-lg font-bold">EmoteMaker.ai</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link className="hover:underline" href="#">
              About Us
            </Link>
            <Link className="hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:underline" href="#">
              Contact Us
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            href="#"
          >
            <FacebookIcon className="w-6 h-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            href="#"
          >
            <TwitterIcon className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            href="#"
          >
            <InstagramIcon className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </footer> */}
    </div>
  )
    }

export default RemoveBackgroundPage
