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

import { useState, useEffect } from "react";
import { getEmotes } from "@/actions/get-emotes";

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

export default useEmotes;