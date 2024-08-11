import { cn } from "@/lib/utils"
import { ActiveTool, Editor, fonts, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../types"
import { ToolSidebarHeader } from "./tool-sidebar-header"
import { ToolSidebarClose } from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"


interface FontSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
    editor: Editor | undefined;
}

export const FontSidebar = ({ activeTool, onChangeActiveTool, editor }: FontSidebarProps) => {
    const value = editor?.getActiveFontFamily()

    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "font" ? "visible" : "hidden")}>
            <ToolSidebarHeader title="Font" description="Change the font of your text" />
            <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    {fonts.map((font) => (
                        <Button 
                            key={font} 
                            className={cn(
                                "w-full h-16 justify-start text-left", value === font && "border-4 border-blue-500"
                            )}
                            size="lg"
                            // onClick={() => editor?.setFont(font)}
                            variant="secondary"
                            style={{
                                fontFamily: font,
                                fontSize: "16px",
                                padding: "8px 16px",
                            }}
                            onClick={() => editor?.changeFontFamily(font)}
                        >
                            {font}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}