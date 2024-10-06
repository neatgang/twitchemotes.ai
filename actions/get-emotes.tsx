// import { db } from "@/lib/db";
// import { Emote } from "@prisma/client";

// // Adjust the function parameter to expect only userId
// export const getEmotes = async ({ userId }: { userId: string | null }) => {
//   try {
//     const emotes = await db.emote.findMany({
//       where: {
//         userId: userId,
//       },
//       orderBy: {
//         createdAt: "asc",
//       }
//     });

//     return emotes;
//   } catch (error) {
//     console.log("[GET_EMOTES] Error:", error);
//     return [];
//   }
// }

// import { db } from "@/lib/db";
// import { Emote } from "@prisma/client";

// export const getEmotes = async ({ userId }: { userId: string | null }) => {
//   try {
//     const emotes = await db.emote.findMany({
//       where: {
//         userId: userId,
//       },
//       orderBy: {
//         createdAt: "asc",
//       }
//     });

//     return { emotes }; // Return as an object with emotes key
//   } catch (error) {
//     console.log("[GET_EMOTES] Error:", error);
//     return { emotes: [] }; // Return an empty array in case of error
//   }
// }

import { cache } from "react";
import { db } from "../lib/db";
import { Emote } from "@prisma/client";

export const getEmotes = cache(async ({ userId }: { userId: string | null }) => {
  try {
    const emotes = await db.emote.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return { emotes }; // Return as an object with emotes key
  } catch (error) {
    console.log("[GET_EMOTES] Error:", error);
    return { emotes: [] }; // Return an empty array in case of error
  }
});

// Set the revalidation period (e.g., 120 seconds)
export const revalidate = 120;
