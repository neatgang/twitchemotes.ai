
import { useState, useEffect } from "react";
import { getEmotes } from "@/actions/get-emotes";
import { useUser } from "@clerk/nextjs";
import { Emote } from "@prisma/client";

const useEmotes = (userId: string | null) => {
  const [emotes, setEmotes] = useState<{ emotes: Emote[] }>({ emotes: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchEmotes = async () => {
      try {
        if (userId) {
          const data = await getEmotes({ userId });
          setEmotes(data);
        } else {
          setEmotes({ emotes: [] });
        }
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