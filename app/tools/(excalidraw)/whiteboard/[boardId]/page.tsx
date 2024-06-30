import { Room } from "@/components/canvas/room";
import { Canvas } from "../_components/canvas";
import { Loading } from "../_components/loading";
import { ImageProvider } from "@/providers/canvas/ImageContext";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

interface BoardIdPageProps {
    params: {
        boardId: string;
    }
}

const BoardIdPage = async ({
    params,
}: BoardIdPageProps) => {

    const { userId } = auth()

    const emotes = await db.emote.findMany({
        where: {
          userId: userId,
        },
        include: {
            emoteForSale: true,
        },
        orderBy: {
          createdAt: "desc",
        }
      });
      
    return (
        <div className="flex h-full">
            <Room roomId={params.boardId} fallback={<Loading />}>
                <Canvas boardId={params.boardId} emotes={emotes}/>
            </Room>
        </div>
    );
}

export default BoardIdPage;