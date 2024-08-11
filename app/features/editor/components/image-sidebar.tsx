import { cn } from "@/lib/utils"
import { ActiveTool, Editor, fonts, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../types"
import { ToolSidebarHeader } from "./tool-sidebar-header"
import { ToolSidebarClose } from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useGetImages } from "../../images/api/use-get-images"
import { AlertTriangle, Loader } from "lucide-react"


interface ImageSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
    editor: Editor | undefined;
}

export const ImageSidebar = ({ activeTool, onChangeActiveTool, editor }: ImageSidebarProps) => {
    const { data, isLoading, isError } = useGetImages()

    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "images" ? "visible" : "hidden")}>
            <ToolSidebarHeader title="Images" description="Add images to your canvas" />
            {isLoading && (
                <div className="flex items-center justify-center flex-1">
                    <Loader className="size-4 text-muted-foreground animate-spin" />
                </div>
            )}
            {isError && (
                <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
                    <AlertTriangle className="size-4 text-muted-foreground" />
                    <p className="text-muted-foreground text-xs">Failed to fetch images</p>
                </div>
            )}
            <ScrollArea>
                <div className="p-4 space-y-4 border-b">

                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}