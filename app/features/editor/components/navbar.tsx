"use client"

import { Hint } from "@/components/hint"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ChevronDown, DownloadCloud, File, FileBox, FileIcon, MousePointerClick, Redo2, Undo2, Undo2Icon } from "lucide-react"
import { ActiveTool } from "../types"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface NavbarProps {
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const Navbar = ({ activeTool, onChangeActiveTool }: NavbarProps) => {
  return (
    <nav className='w-full flex items-center h-[68px]'>
      <Button variant="link">
        <Link href="/emoteboard/editor/1" className="flex items-center">
        {/* <Avatar className="mr-2">
          <AvatarImage src="/peepopainter.jpg"/>
        </Avatar>  */}
        Emoteboard
        </Link>
      </Button>
      <div className="w-full flex items-center gap-x-1 h-full border-b border-gray-200 px-2">
        {/* <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem 
              onClick={() => {
                console.log("Open")
              }}
              className="flex items-center gap-x-2">
              <File className="size-8"/>
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">Open a JSON file</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        {/* <Separator orientation="vertical" className="mx-2"/> */}
        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon" onClick={() => onChangeActiveTool("select")} className={cn(activeTool === "select" && "bg-gray-100")}>
            <MousePointerClick className="size-4"/>
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon" onClick={() => {}} className="">
            <Undo2 className="size-4"/>
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon" onClick={() => {}} className="">
            <Redo2 className="size-4"/>
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2"/>
        <div className="flex items-center gap-x-2">
          <CheckCircle className="size-20 text-muted-foreground" />
          <div className="text-xs text-muted-foreground">
            Saved
          </div>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <DownloadCloud className="size-4 ml-2"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mix-w-60">
            <DropdownMenuItem 
                className="flex items-center gap-x-2"
                onClick={() => {
                  console.log("Save")
                }}
              >
                <FileIcon className="size-8"/>
                <p>JSON</p>
                <p className="text-xs text-muted-foreground">Save for editing later</p>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-x-2"
                onClick={() => {
                  console.log("Save")
                }}
              >
                <FileIcon className="size-8"/>
                <p>PNG</p>
                <p className="text-xs text-muted-foreground">Best for sharing on the web</p>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-x-2"
                onClick={() => {
                  console.log("Save")
                }}
              >
                <FileIcon className="size-8"/>
                <p>JPG</p>
                <p className="text-xs text-muted-foreground">Best for printing</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
  </nav>
  )
}