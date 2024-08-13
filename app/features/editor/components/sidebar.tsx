"use client"

import { CloudCogIcon, ImageIcon, LayoutTemplate, PaintBucket, Settings, Shapes, Sparkle, Type } from "lucide-react"
import { SidebarItem } from "./sidebar-item"
import { ActiveTool } from "../types";

interface SidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
    return (
        <aside className="bg-white flex flex-col w-[64px] h-full border-r overflow-y-auto">
            <ul className="flex flex-col"> 
                <SidebarItem 
                    icon={LayoutTemplate} 
                    label="My Emotes" 
                    isActive={activeTool === "emotes"} 
                    onClick={() => onChangeActiveTool("emotes")} 
                />
                <SidebarItem 
                    icon={PaintBucket} 
                    label="Generate" 
                    isActive={activeTool === "emote-generator"} 
                    onClick={() => onChangeActiveTool("emote-generator")} 
                />
                <SidebarItem 
                    icon={ImageIcon} 
                    label="Images" 
                    isActive={activeTool === "images"} 
                    onClick={() => onChangeActiveTool("images")} 
                />
                <SidebarItem 
                    icon={Type} 
                    label="Text" 
                    isActive={activeTool === "text"} 
                    onClick={() => onChangeActiveTool("text")} 
                />
                <SidebarItem 
                    icon={Shapes} 
                    label="Shapes" 
                    isActive={activeTool === "shapes"} 
                    onClick={() => onChangeActiveTool("shapes")} 
                />
                {/* <SidebarItem 
                    icon={Sparkle} 
                    label="AI" 
                    isActive={activeTool === "ai"} 
                    onClick={() => onChangeActiveTool("ai")} 
                /> */}
                <SidebarItem 
                    icon={Settings} 
                    label="Settings" 
                    isActive={activeTool === "settings"} 
                    onClick={() => onChangeActiveTool("settings")} 
                />
            </ul>
        </aside>
    )
}