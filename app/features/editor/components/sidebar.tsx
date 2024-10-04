"use client"

import { CloudCogIcon, ImageIcon, LayoutTemplate, PaintBucket, Pencil, Settings, Shapes, Sparkle, Type } from "lucide-react"
import { SidebarItem } from "./sidebar-item"
import { ActiveTool } from "../types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
    return (
        <TooltipProvider delayDuration={0}>
            <aside className="bg-white flex flex-col w-[64px] h-full border-r">
                <nav className="flex flex-col flex-1">
                    {[
                        { icon: LayoutTemplate, label: "My Emotes", tool: "emotes" },
                        { icon: PaintBucket, label: "Generate", tool: "emote-generator" },
                        { icon: ImageIcon, label: "Images", tool: "images" },
                        { icon: Type, label: "Text", tool: "text" },
                        { icon: Shapes, label: "Shapes", tool: "shapes" },
                        { icon: Pencil, label: "Draw", tool: "draw" },
                        { icon: Settings, label: "Settings", tool: "settings" },
                    ].map(({ icon, label, tool }) => (
                        <Tooltip key={tool}>
                            <TooltipTrigger asChild>
                                <div>
                                    <SidebarItem 
                                        icon={icon}
                                        label={label}
                                        isActive={activeTool === tool}
                                        onClick={() => onChangeActiveTool(tool as ActiveTool)}
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                                <p>{label}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </nav>
            </aside>
        </TooltipProvider>
    )
}