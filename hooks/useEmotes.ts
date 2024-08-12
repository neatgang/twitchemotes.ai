
import { useState, useEffect } from "react";
import { getEmotes } from "@/actions/get-emotes";
import { useUser } from "@clerk/nextjs";
import { Emote } from "@prisma/client";

const useEmotes = () => {
  const [emotes, setEmotes] = useState<Emote[]>([]);
  const { user } = useUser(); // useUser hook from Clerk for client-side user management

  useEffect(() => {
    const fetchEmotes = async () => {
      if (user?.id) { // Check if user and user.id exist
        const userEmotes = await getEmotes({ userId: user.id });
        // setEmotes(userEmotes);
      }
    };

    fetchEmotes();
  }, [user?.id]); // Depend on user.id

  return emotes;
};

export default useEmotes;