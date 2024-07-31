import { Editor } from "@/app/features/editor/components/editor";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const EditorProjectIdPage = async () => {
  const { userId } = auth();

  const emotes = await db.emote.findMany({
    where: {
      userId: userId,
    },
    include: {
      emoteForSale: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="h-full">
      <Editor emotes={emotes} />
    </div>
  );
};

export default EditorProjectIdPage;