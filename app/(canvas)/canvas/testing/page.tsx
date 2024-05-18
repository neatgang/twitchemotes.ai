/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IbSk3C0SGGs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { BoldIcon, EyeIcon, GhostIcon, ImageIcon, ImportIcon, InfoIcon, ItalicIcon, LayoutTemplateIcon, LockIcon, MinusIcon, MoveIcon, PlusIcon, RedoIcon, SaveIcon, ScalingIcon, SettingsIcon, ShapesIcon, ShareIcon, SmileIcon, TextIcon, UnderlineIcon, UndoIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="h-screen w-screen grid grid-cols-[280px_1fr_280px] grid-rows-[80px_1fr_80px] gap-4">
      <div className="col-span-3 row-start-1 bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-4">
        <Link className="flex items-center gap-2" href="#">
          <SmileIcon className="h-6 w-6" />
          <span className="font-semibold">EmoteMaker.ai</span>
        </Link>
        <h1 className="text-2xl font-bold">Canvas Playground</h1>
        <nav className="flex items-center gap-4">
          <Link className="text-sm font-medium hover:underline" href="#">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            Profile
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            Subscription
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            Help
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="outline">
            <SaveIcon className="h-5 w-5" />
            <span className="sr-only">Save</span>
          </Button>
          <Button size="icon" variant="outline">
            <ShareIcon className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
          <Button size="icon" variant="outline">
            <SettingsIcon className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
      <div className="row-span-2 bg-gray-200 dark:bg-gray-900 rounded-lg p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Element Library</h3>
            <Input
              className="w-2/3 bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search elements..."
              type="search"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" size="icon" variant="outline">
              <ShapesIcon className="w-4 h-4" />
              <span className="sr-only">Shapes</span>
            </Button>
            <Button className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" size="icon" variant="outline">
              <ImageIcon className="w-4 h-4" />
              <span className="sr-only">Icons</span>
            </Button>
            <Button className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" size="icon" variant="outline">
              <SmileIcon className="w-4 h-4" />
              <span className="sr-only">Emojis</span>
            </Button>
            <Button className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" size="icon" variant="outline">
              <TextIcon className="w-4 h-4" />
              <span className="sr-only">Text</span>
            </Button>
            <Button className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" size="icon" variant="outline">
              <LayoutTemplateIcon className="w-4 h-4" />
              <span className="sr-only">Templates</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 flex flex-col items-center justify-center">
              <ShapesIcon className="h-8 w-8" />
              <span className="text-xs font-medium mt-1">Shape</span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Templates</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-2 flex flex-col items-center justify-center">
                <LayoutTemplateIcon className="h-8 w-8" />
                <span className="text-xs font-medium mt-1">Template 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-2 bg-gray-50 dark:bg-gray-950 rounded-lg p-4 flex flex-col">
        <div className="flex-1 border border-gray-200 dark:border-gray-800 rounded-lg p-2 relative">
          <div className="absolute inset-0 bg-[conic-gradient(at_50%_50%,_#000_25%,#FFF_0)] bg-[length:20px_20px] bg-[position:center_center] bg-no-repeat" />
          <div className="absolute inset-0 flex items-center justify-center" />
          <div className="absolute inset-x-0 bottom-2 flex justify-between px-4">
            <Button className="w-8 h-8" size="icon" variant="outline">
              <MinusIcon className="w-4 h-4" />
              <span className="sr-only">Zoom out</span>
            </Button>
            <Button className="w-8 h-8" size="icon" variant="outline">
              <PlusIcon className="w-4 h-4" />
              <span className="sr-only">Zoom in</span>
            </Button>
            <Button className="w-8 h-8" size="icon" variant="outline">
              <MoveIcon className="w-4 h-4" />
              <span className="sr-only">Pan</span>
            </Button>
          </div>
        </div>
        <div className="mt-4 border border-gray-200 dark:border-gray-800 rounded-lg p-2" />
      </div>
      <div className="col-span-1 row-span-2 bg-gray-200 dark:bg-gray-900 rounded-lg p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Properties</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Size and Position</h4>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Width"
                  type="number"
                />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Height"
                  type="number"
                />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="X"
                  type="number"
                />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Y"
                  type="number"
                />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Rotation"
                  type="number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Color and Effects</h4>
              <div className="flex flex-wrap gap-2">
                <Button className="w-8 h-8 rounded-full bg-red-500" size="icon" variant="outline" />
                <Button className="w-8 h-8 rounded-full bg-orange-500" size="icon" variant="outline" />
                <Button className="w-8 h-8 rounded-full bg-yellow-500" size="icon" variant="outline" />
                <Button className="w-8 h-8 rounded-full bg-green-500" size="icon" variant="outline" />
                <Button className="w-8 h-8 rounded-full bg-blue-500" size="icon" variant="outline" />
                <Button className="w-8 h-8 rounded-full bg-indigo-500" size="icon" variant="outline" />
                <Button className="w-8 h-8 rounded-full bg-purple-500" size="icon" variant="outline" />
                <Button className="w-8 h-8 rounded-full bg-pink-500" size="icon" variant="outline" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-yellow-500"
                  size="icon"
                  variant="outline"
                >
                  <ScalingIcon className="w-4 h-4" />
                  <span className="sr-only">Gradient</span>
                </Button>
                <Button className="w-8 h-8 rounded-full bg-white shadow-lg" size="icon" variant="outline">
                  <GhostIcon className="w-4 h-4" />
                  <span className="sr-only">Shadow</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Text Options</h4>
              <div className="grid gap-2">
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Enter text..."
                  type="text"
                />
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="times">Times New Roman</SelectItem>
                    <SelectItem value="verdana">Verdana</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Button className="w-8 h-8" size="icon" variant="outline">
                    <BoldIcon className="w-4 h-4" />
                    <span className="sr-only">Bold</span>
                  </Button>
                  <Button className="w-8 h-8" size="icon" variant="outline">
                    <ItalicIcon className="w-4 h-4" />
                    <span className="sr-only">Italic</span>
                  </Button>
                  <Button className="w-8 h-8" size="icon" variant="outline">
                    <UnderlineIcon className="w-4 h-4" />
                    <span className="sr-only">Underline</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Layers</h3>
          <div className="grid gap-2">
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-2">
              <div className="flex items-center gap-2">
                <ShapesIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Shape 1</span>
              </div>
              <div className="flex items-center gap-2">
                <Button className="w-6 h-6" size="icon" variant="outline">
                  <LockIcon className="w-3 h-3" />
                  <span className="sr-only">Lock</span>
                </Button>
                <Button className="w-6 h-6" size="icon" variant="outline">
                  <EyeIcon className="w-3 h-3" />
                  <span className="sr-only">Hide/Show</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex justify-between">
          <Button size="icon" variant="outline">
            <UndoIcon className="h-5 w-5" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button size="icon" variant="outline">
            <RedoIcon className="h-5 w-5" />
            <span className="sr-only">Redo</span>
          </Button>
        </div>
      </div>
      <div className="col-span-3 row-start-3 bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5" />
          <span className="text-sm">Drag and drop elements to customize your emote</span>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="outline">
            <SaveIcon className="h-5 w-5" />
            <span className="sr-only">Save</span>
          </Button>
          <Button size="icon" variant="outline">
            <ImportIcon className="h-5 w-5" />
            <span className="sr-only">Export</span>
          </Button>
          <Button size="icon" variant="outline">
            <ShareIcon className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
