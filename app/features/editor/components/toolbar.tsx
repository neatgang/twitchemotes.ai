"use client"

import { useState } from "react";
import { ActiveTool, Editor } from "../types"
import { Hint } from "@/components/hint";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ChevronDown, PaintBucket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";


interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {

    const fillColor = editor?.getActiveFillColor()
    const strokeColor = editor?.getActiveStrokeColor()   
    const fontFamily = editor?.getActiveFontFamily()

    const selectedObjectType = editor?.selectedObjects[0]?.type

    const isText = isTextType(selectedObjectType)

    if (editor?.selectedObjects.length === 0) {
        return (
            <div className="shrink-0 h-[56px] border-b border-gray-300 bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
        )
    }

    return (
        <div className="shrink-0 h-[62px] border-b border-gray-300 bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" >
            <div className="flex items-center h-full justify-center">
                <Hint label="Color" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("fill")}
                        size="icon"
                        variant="ghost"
                        className={cn(activeTool === "fill" && "bg-gray-100")}
                    >
                        <div className="w-10 h-10 border rounded-md" style={{ backgroundColor: fillColor || "transparent" }} />
                    </Button>
                </Hint>
            </div>
            {!isText && (
            <div className="flex items-center h-full justify-center">
                <Hint label="Stroke color" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("stroke-color")}
                        size="icon"
                        variant="ghost"
                        className={cn(activeTool === "stroke-color" && "bg-gray-100")}
                    >
                        <div className="w-10 h-10 border-4 rounded-md" style={{ borderColor: strokeColor || "transparent" }} />
                    </Button>
                </Hint>
                </div>
            )}
               {!isText && (
            <div className="flex items-center h-full justify-center">
                <Hint label="Stroke width" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("stroke-width")}
                        size="icon"
                        variant="ghost"
                        className={cn(activeTool === "stroke-width" && "bg-gray-100")}
                    >
                        <BsBorderWidth className="size-4" />
                    </Button>
                </Hint>
            </div>
               )}
                     {isText && (
            <div className="flex items-center h-full justify-center">
                <Hint label="Font" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("font")}
                        size="icon"
                        variant="ghost"
                        className={cn("w-auto px-2 text-sm", activeTool === "stroke-width" && "bg-gray-100")}
                    >
                        <div className="max-w-[100px] truncate">
                            {fontFamily}
                        </div>
                        <ChevronDown className="size-4 ml-2 shrink-0"/>
                    </Button>
                </Hint>
            </div>
               )}
            <div className="flex items-center h-full justify-center">
                <Hint label="Bring forward" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.bringForward()}
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowUp className="size-4"/>
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Send backwards" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.sendBackwards()}
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowDown className="size-4"/>
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Opacity" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("opacity")}
                        size="icon"
                        variant="ghost"
                        className={cn(activeTool === "opacity" && "bg-gray-100")}
                    >
                        <RxTransparencyGrid className="size-4"/>
                    </Button>
                </Hint>
            </div>
        </div>
    )
}