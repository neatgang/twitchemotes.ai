import { Liveblocks } from "@liveblocks/node";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db"; // Import the Prisma client

const liveblocks = new Liveblocks({
    secret: "sk_dev_-KV54Q8OZWzHRn69mVbdddm6btTzFaYk0JjjEqHxqn0yPfydb6SMVBot7uYtyOQ6", // Replace with your actual secret key
});

export async function POST(request: Request) {
    const { userId } = auth();
    const user = await currentUser();

    console.log("AUTH_INFO", {
        userId,
        user,
    });

    if (!userId || !user) {
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();

    // Use Prisma to query the board
    const board = await db.board.findUnique({
        where: { id: room },
    });

    console.log("AUTH_INFO", {
        room,
        board,
        boardAuthorId: board?.authorId,
        userId: user.id,
    });

    if (board?.authorId !== user.id) {
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.firstName || "User",
        picture: user.imageUrl!,
    };

    console.log({ userInfo });

    const session = liveblocks.prepareSession(
        user.id,
        { userInfo }
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();

    console.log({ status, body }, "ALLOWED");

    return new Response(body, { status });
}