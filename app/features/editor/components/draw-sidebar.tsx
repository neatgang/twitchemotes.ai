import { cn } from "@/lib/utils"
import { ActiveTool, Editor, FILL_COLOR, STROKE_COLOR, STROKE_WIDTH } from "../types"
import { ToolSidebarHeader } from "./tool-sidebar-header"
import { ToolSidebarClose } from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ColorPicker } from "./color-picker"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"


interface DrawSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
    editor: Editor | undefined;
}

export const DrawSidebar = ({ activeTool, onChangeActiveTool, editor }: DrawSidebarProps) => {

    const [prompt, setPrompt] = useState("");
    const [maskUrl, setMaskUrl] = useState("");
  
    const handleInpaint = async () => {
        if (editor) {
          const maskUrl = editor.generateMaskUrl();
          const imageUrl = editor.getActiveImageUrl(); // Assuming you have a method to get the active image URL
    
          try {
            const response = await axios.post('/api/models/fal/inpaint', {
              prompt,
              image_url: imageUrl,
              mask_url: maskUrl,
            });
    
            if (response.status === 200) {
              const newImageUrl = response.data.image.url;
              editor.updateImage(newImageUrl); // Assuming you have a method to update the image on the canvas
            } else {
              console.error('Inpainting failed:', response.data);
            }
          } catch (error) {
            console.error('Error inpainting image:', error);
          }
        }
      };

    const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
    const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

    const onClose = () => {
        onChangeActiveTool("select")
    }

    const onColorChange = (value: string) => {
        editor?.changeStrokeColor(value)
    }

    const onWidthChange = (value: number) => {
        editor?.changeStrokeWidth(value)
    }

    return (
        <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "draw" ? "visible" : "hidden")}>
          <ToolSidebarHeader title="Drawing Mode" description="Draw on your canvas" />
          <ScrollArea>
            <div className="p-4 space-y-6 border-b">
              <Label>Brush Width</Label>
              <Slider value={[widthValue]} onValueChange={(values) => onWidthChange(values[0])} />
            </div>
            {/* <div className="p-4 space-y-6">
              <Label>Inpainting Prompt</Label>
              <Input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="input" />
              <Button onClick={handleInpaint} variant="default" className="w-full">Inpaint</Button>
            </div> */}
          </ScrollArea>
          <ToolSidebarClose onClick={onClose} />
        </aside>
      );
    };