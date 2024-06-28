"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ImageIcon } from "lucide-react"

export default function WhiteboardSidebar() {
  return (
    <div className="h-full">
      <div className="w-80 flex flex-col border-r bg-muted/20">
        {/* <div className="flex items-center gap-2 p-4 border-b">
          <SmileIcon className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">Emoji Designer</span>
          <div className="ml-auto">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div> */}
       <div className="p-4 space-y-4">
            <Label>Model</Label>
            <div className="flex items-center gap-4">
              <Select defaultValue="dalle3">
                <SelectTrigger>
                  <SelectValue placeholder="Dalle3" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub-option</SelectLabel>
                    <SelectItem value="character">Character</SelectItem>
                    <SelectItem value="object">Object</SelectItem>
                    <SelectItem value="scene">Scene</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Input id="prompt" placeholder="Describe the desired emote" className="w-full" />
          </div>
          <div className="flex items-center justify-between">
            <Button className="w-full">
              Generate
              {/* <span className="ml-2 rounded bg-secondary px-2 py-1 text-sm font-medium text-secondary-foreground">
                1 Credit
              </span> */}
            </Button>
          </div>
          <div className="border rounded-lg">
            
            <div>
              {/* {({ open }) => (
                <>
                  <Button className="flex w-full items-center justify-between rounded-lg bg-muted px-4 py-2 text-left text-sm font-medium hover:bg-muted/80 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                    <span>Negative Prompt</span>
                    <Icon prompt={open ? "Chevron down" : "Chevron right"} className="w-4 h-4" />
                  </Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-muted-foreground">
                    <Textarea placeholder="Exclude certain elements..." rows={4} className="w-full" />
                  </Disclosure.Panel>
                </>
              )} */}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prompt">Negative Prompt</Label>
            <Input id="prompt" placeholder="Exclude elements" className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Reference Image</Label>
            <div className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <div className="">
            <Label>Mode</Label>
            <div className="flex items-center gap-4">
              <Select defaultValue="controlnet">
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Mode</SelectLabel>
                    <SelectItem value="controlnet">ControlNet</SelectItem>
                    <SelectItem value="inpainting">Inpainting</SelectItem>
                    <SelectItem value="outpainting">Outpainting</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="character">
                <SelectTrigger>
                  <SelectValue placeholder="Select sub-option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub-option</SelectLabel>
                    <SelectItem value="character">Character</SelectItem>
                    <SelectItem value="object">Object</SelectItem>
                    <SelectItem value="scene">Scene</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* <div className="flex items-center justify-between">
            <Label htmlFor="mode-mapping" className="cursor-pointer">
              <Switch id="mode-mapping" defaultChecked />
            </Label>
            <span>Mode Mapping</span>
          </div> */}
        </div>
        {/* <div className="mt-auto flex flex-col gap-4 p-4">
          <div className="flex items-center gap-2">
            <PenIcon className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm font-medium">Drawing Tools</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <PenIcon className="w-5 h-5" />
              <span className="sr-only">Draw</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ImageIcon className="w-5 h-5" />
              <span className="sr-only">Add Image</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <CropIcon className="w-5 h-5" />
              <span className="sr-only">Crop</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <TextIcon className="w-5 h-5" />
              <span className="sr-only">Insert Text</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShapesIcon className="w-5 h-5" />
              <span className="sr-only">Insert Shape</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UndoIcon className="w-5 h-5" />
              <span className="sr-only">Undo</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <RedoIcon className="w-5 h-5" />
              <span className="sr-only">Redo</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <TrashIcon className="w-5 h-5" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div> */}
      </div>
      {/* <div className="flex-1 p-4" /> */}
    </div>
  )
}
