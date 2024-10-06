"use client"

import { useState } from "react";
import { ActiveTool, Editor } from "../types"

import { AlignRight, ArrowDown, ArrowUp, ChevronDown, DownloadCloud, EraserIcon, FrameIcon, PaintBucket, PictureInPicture, PictureInPicture2, Save, Scissors, Trash2 } from "lucide-react";

import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";
import { ColorPicker } from "./color-picker";
import { TbColorFilter, TbPictureInPictureFilled } from "react-icons/tb";
import { Wand2 } from 'lucide-react'; // Add this import
import { Hint } from "../../../../components/hint";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";
import { Loader2 } from "lucide-react"; // Add this import
import { SlPicture } from "react-icons/sl";
import { Emote } from "@prisma/client";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
    addEmote: (newEmote: Emote) => void;
    currentPrompt: string;
}

export const Toolbar = ({ editor, activeTool, onChangeActiveTool, addEmote, currentPrompt }: ToolbarProps) => {
    const { userId } = useAuth();
    const [isRemovingBackground, setIsRemovingBackground] = useState(false);
    const [isSavingEmote, setIsSavingEmote] = useState(false);
    const [isDownloadingEmote, setIsDownloadingEmote] = useState(false);

    const fillColor = editor?.getActiveFillColor()
    const strokeColor = editor?.getActiveStrokeColor()   
    const fontFamily = editor?.getActiveFontFamily()

    const selectedObjectType = editor?.selectedObjects[0]?.type

    const isText = isTextType(selectedObjectType)
    const isImage = selectedObjectType === "image"
    const isEmote = selectedObjectType === "emote"

    if (editor?.selectedObjects.length === 0) {
        return (
            <div className="shrink-0 h-[56px] border-b border-gray-300 bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
        )
    }

    return (
        <div className="shrink-0 h-[62px] border-b border-gray-300 bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" >
                {!isImage && (
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
            )}
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
            <div className="flex items-center h-full justify-center">
                <Hint label="Delete" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.delete()}
                        size="icon"
                        variant="ghost"
                        className={cn(activeTool === "opacity" && "bg-gray-100")}
                    >
                        <Trash2 className="size-4"/>
                    </Button>
                </Hint>
            </div>
            {isImage && (
            <div className="flex items-center h-full justify-center">
                <Hint label="Filter" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("filter")}
                        size="icon"
                        variant="ghost"
                        className={cn(activeTool === "filter" && "bg-gray-100")}
                    >
                        <TbColorFilter className="size-4"/>
                    </Button>
                </Hint>
            </div>
            )}
            {isImage && (
              <div className="flex items-center h-full justify-center">
                <Hint label="Remove Background" side="bottom" sideOffset={5}>
                    <Button
                        onClick={async () => {
                            setIsRemovingBackground(true);
                            try {
                                await editor?.removeBackground();
                            } finally {
                                setIsRemovingBackground(false);
                            }
                        }}
                        size="sm"
                        variant="ghost"
                        disabled={isRemovingBackground}
                    >
                        {isRemovingBackground ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <EraserIcon className="size-4" />
                        )}
                    </Button>
                </Hint>
            </div>
            )}
            <div className="flex items-center h-full justify-center">
                <Hint label="Download Emote" side="bottom" sideOffset={5}>
                    <Button
                        onClick={async () => {
                            setIsDownloadingEmote(true);
                            try {
                                await editor?.downloadImage();
                            } finally {
                                setIsDownloadingEmote(false);
                            }
                        }}
                        size="icon"
                        variant="ghost"
                        disabled={isDownloadingEmote}
                    >
                        {isDownloadingEmote ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <DownloadCloud className="size-4" />
                        )}
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Save Emote" side="bottom" sideOffset={5}>
                    <Button
                        onClick={async () => {
                            setIsSavingEmote(true);
                            try {
                                if (!editor) {
                                    throw new Error('Editor is not initialized');
                                }
                                if (!userId) {
                                    throw new Error('User is not authenticated');
                                }
                                const savedEmote = await editor.saveEmote(currentPrompt, userId);
                                if (savedEmote) {
                                    addEmote(savedEmote);
                                    toast.success('Emote saved successfully');
                                } else {
                                    throw new Error('Failed to save emote');
                                }
                            } catch (error) {
                                console.error('Failed to save emote:', error);
                                toast.error(`Failed to save emote: ${error instanceof Error ? error.message : 'Unknown error'}`);
                            } finally {
                                setIsSavingEmote(false);
                            }
                        }}
                        size="icon"
                        variant="ghost"
                        disabled={isSavingEmote || !userId}
                    >
                        {isSavingEmote ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <Save className="size-4" />
                        )}
                    </Button>
                </Hint>
            </div>
            {/* <Button
                variant={activeTool === "inpaint" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => onChangeActiveTool("inpaint")}
            >
                <Wand2 className="h-4 w-4" />
            </Button> */}
        </div>
    )
}