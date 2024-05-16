import { auth } from "@clerk/nextjs"
import ProfileEmotes from "./_components/ProfileEmotes"
import { db } from "@/lib/db";

const PhotoPage = async () => {

const { userId } = auth();

const emotes = await db.emote.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    }
  });


    return (
        <>
            <ProfileEmotes emotes={emotes}/>
        </>
    )
}

export default PhotoPage
