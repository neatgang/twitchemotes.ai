import {
    Bird,
    Book,
    Bot,
    Code2,
    LifeBuoy,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    TerminalIcon,
    Triangle,
    Turtle,
    User,
  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import Image from "next/image"

export function Sidebar() {
    return (
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          {/* <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Image className="size-5 fill-foreground" src="/peepopainter.jpg" width={40} height={40} alt="EmoteMaker.ai" />
            </Button>
          </div> */}
          <nav className="grid gap-1 p-2">
            {/* Tooltip components for each navigation button */}
            {/* Playground Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                >
                  <TerminalIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>
            {/* Other tooltips... */}
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            {/* Tooltip components for each navigation button */}
            {/* Help Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
            {/* Other tooltips... */}
          </nav>
        </aside>
    )
}