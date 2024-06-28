

import { BoardList } from "@/components/canvas/boardlist";
import { EmptyOrg } from "@/components/canvas/empty-org";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DashboardPage = async () => {
    const { userId } = auth();
    
    if (!userId) {
        throw new Error("User ID is required");
    }

    const boards = await db.board.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            orgId: true,
            authorId: true,
            authorName: true,
            imageUrl: true,
            createdAt: true,
            userId: true,
        }
    });

    return (
        <div className="flex flex-col h-[calc(100%-80px)] p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Whiteboards</h1>
                <Button className="flex items-center gap-2">
                    <PlusCircle size={20} />
                    Create New Whiteboard
                </Button>
            </div>
            <BoardList boards={boards} />
        </div>
    )
}

export default DashboardPage