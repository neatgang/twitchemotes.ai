"use client"

import { useState } from "react";
import { ActiveTool, Editor } from "../types"
import { Hint } from "@/components/hint";

import { cn } from "@/lib/utils";
import { PaintBucket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {

    const selectedObject = editor?.canvas.getActiveObject();

    const getProperty = (property: any) => {
        if (!selectedObject) 
            return null;

        return selectedObject.get(property);
    }

    const fillColor = getProperty("fill")
    const fillColor2 = editor?.fillColor

    const [properties, setProperties] = useState({
        fillColor,
    })
    
    return (
        <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
            <div className="flex items-center h-full justify-center">
                <Hint label="Color" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("fill")}
                        size="icon"
                        variant="ghost"
                        className={cn(activeTool === "fill" && "bg-gray-100")}
                    >
                        <div className="w-10 h-10 border rounded-md" style={{ backgroundColor: typeof fillColor === "string" ? fillColor : "black" }} />
                    </Button>
                </Hint>
            </div>
        </div>
    )
}