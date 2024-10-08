import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Emote } from "@prisma/client";
import { ActiveTool, Editor } from "../types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EmoteSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
    editor: Editor | undefined;
    emotes: Emote[];
    setCurrentPrompt: (prompt: string) => void;
}

const ITEMS_PER_PAGE = 10;

export const EmoteSidebar = ({ activeTool, onChangeActiveTool, editor, emotes, setCurrentPrompt }: EmoteSidebarProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentPrompt, setCurrentPromptState] = useState<string>("");

    const filteredEmotes = emotes.filter(emote => 
        emote.prompt?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmotes.length / ITEMS_PER_PAGE);
    const paginatedEmotes = filteredEmotes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [searchTerm, currentPage]);

    const onClose = () => {
        onChangeActiveTool("select");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddToCanvas = (emote: Emote) => {
        editor?.addEmote(emote.imageUrl!);
        setCurrentPrompt(emote.prompt || "");
    };

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-2 gap-4">
            {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                <Skeleton key={index} className="w-full h-[100px]" />
            ))}
        </div>
    );

    return (
        <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "emotes" ? "visible" : "hidden")}>
            <ToolSidebarHeader title="Emotes" description="Add emotes to your canvas" />
            <div className="p-4">
                <Input 
                    placeholder="Search emotes..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mb-4"
                />
            </div>
            <ScrollArea className="flex-grow">
                <div className="p-4">
                    {loading ? (
                        <LoadingSkeleton />
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {paginatedEmotes.map((emote: Emote) => (
                                <div key={emote.id} className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border">
                                    <img
                                        src={emote.imageUrl!}
                                        alt={emote.prompt || emote.id}
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        onClick={() => handleAddToCanvas(emote)}
                                        className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition bg-black bg-opacity-50 flex items-center justify-center text-white"
                                    >
                                        Add to Canvas
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
            {/* <div className="p-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => handlePageChange(index + 1)}
                                    isActive={currentPage === index + 1}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext 
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div> */}
            <div className="p-4 flex justify-between items-center">
    <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
    >
        <ChevronLeft className="h-4 w-4" />
    </Button>
    <span className="text-sm font-medium">
        {currentPage} / {totalPages}
    </span>
    <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
    >
        <ChevronRight className="h-4 w-4" />
    </Button>
</div>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};