import { cn } from "@/lib/utils"
import { ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../types"
import { ToolSidebarHeader } from "./tool-sidebar-header"
import { ToolSidebarClose } from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"


interface TextSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
    editor: Editor | undefined;
}

export const TextSidebar = ({ activeTool, onChangeActiveTool, editor }: TextSidebarProps) => {

    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "text" ? "visible" : "hidden")}>
            <ToolSidebarHeader title="Text" description="Add text to your canvas" />
            <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    <Button className="w-full" onClick={() => editor?.addText("Textbox")}>
                        Add a textbox
                    </Button>
                    <Button className="w-full h-16" variant="secondary" onClick={() => editor?.addText("Heading", {
                        fontSize: 80,
                        fontWeight: 700,
                    })}>
                        <span className="text-2xl font-bold">
                            Add a heading
                        </span>
                    </Button>
                    <Button className="w-full h-16" variant="secondary" onClick={() => editor?.addText("Subheading", {
                        fontSize: 44,
                        fontWeight: 500,
                    })}>
                        <span className="text-xl font-bold">
                            Add a sub heading
                        </span>
                    </Button>
                    <Button className="w-full h-16" variant="secondary" onClick={() => editor?.addText("Paragraph", {
                        fontSize: 18,

                    })}>
                        Paragraph
                    </Button>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}