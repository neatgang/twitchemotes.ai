import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AlertTriangle, Loader } from "lucide-react";
import Image from "next/image";
import { Emote } from "@prisma/client";
import { ActiveTool, Editor } from "../types";

interface EmoteSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
    editor: Editor | undefined;
    emotes: Emote[]; // Accept emotes as props
}

export const EmoteSidebar = ({ activeTool, onChangeActiveTool, editor, emotes }: EmoteSidebarProps) => {
    const onClose = () => {
        onChangeActiveTool("select");
    };

    return (
        <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "emotes" ? "visible" : "hidden")}>
            <ToolSidebarHeader title="Emotes" description="Add emotes to your canvas" />
            <ScrollArea>
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {emotes.map((emote: Emote) => (
                            <div key={emote.id} className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border">
                                <Image
                                    fill
                                    src={emote.imageUrl!}
                                    alt={emote.id}
                                    className="object-cover"
                                />
                                <button
                                    onClick={() => editor?.addEmote(emote.imageUrl!)}
                                    className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition bg-black bg-opacity-50 flex items-center justify-center text-white"
                                >
                                    Add to Canvas
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};