"use client"

import { EmptyBoards } from "./empty-boards";
import { BoardCard } from "./board-card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { createBoard } from "@/actions/create-board";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { redirect } from "next/navigation";

interface BoardListProps {
    boards: Board[];
}

interface Board {
    id: string;
    title: string;
    orgId: string | null;
    authorId: string | null;
    authorName: string | null;
    imageUrl: string | null;
    createdAt: Date;
    userId: string;
}

export const BoardList = ({ boards }: BoardListProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await createBoard("New Board1");
            toast.success("Board created");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create a board");
        } finally {
            setIsLoading(false);
        }
    };

    if (!boards.length) {
        return <EmptyBoards />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-6">
          {boards.map((board) => (
                board && <BoardCard
                    key={board.id}
                    {...board}
                />
            ))}
            <div className="aspect-[100/127] border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <Button 
            onClick={handleClick} 
            disabled={isLoading}
            className="flex items-center gap-2"
        >
                <div className="flex flex-col items-center gap-2">
                    <PlusCircle size={24} />
                    <span>Add New Whiteboard</span>
                </div>
                </Button>
            </div>
        </div>
    );
};