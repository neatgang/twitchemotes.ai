import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AlertTriangle, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ActiveTool, Editor } from "../types";
import { Emote } from "@prisma/client";
import { useEffect, useState } from "react";
import { getEmotes } from "@/actions/get-emotes";
import { useUser } from "@clerk/nextjs";

interface EmoteSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
    editor: Editor | undefined;
}

const useEmotes = (userId: string | null) => {
    const [emotes, setEmotes] = useState<{ emotes: Emote[] }>({ emotes: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchEmotes = async () => {
            try {
                const data = await getEmotes({ userId });
                setEmotes(data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmotes();
    }, [userId]);

    return { emotes, isLoading, isError };
};

export const EmoteSidebar = ({ activeTool, onChangeActiveTool, editor }: EmoteSidebarProps) => {
    const { user } = useUser();
    const { emotes, isLoading, isError } = useEmotes(user?.id || null);

    const onClose = () => {
        onChangeActiveTool("select");
    };

    return (
        <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "emotes" ? "visible" : "hidden")}>
            <ToolSidebarHeader title="Emotes" description="Add emotes to your canvas" />
            {isLoading && (
                <div className="flex items-center justify-center flex-1">
                    <Loader className="size-4 text-muted-foreground animate-spin" />
                </div>
            )}
            {isError && (
                <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
                    <AlertTriangle className="size-4 text-muted-foreground" />
                    <p className="text-muted-foreground text-xs">Failed to fetch emotes</p>
                </div>
            )}
            <ScrollArea>
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {emotes.emotes.map((emote: Emote) => {
                            return (
                                <button
                                    key={emote.id}
                                    className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                                    onClick={() => editor?.addEmote(emote.id)}
                                >
                                    <Image
                                        fill
                                        src={emote.imageUrl!}
                                        alt={emote.id}
                                        className="object-cover"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};