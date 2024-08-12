

import { Editor } from "@/app/features/editor/components/editor";

import { auth } from "@clerk/nextjs/server";
import { getEmotes } from "../../../../../actions/get-emotes";
import { redirect } from "next/navigation";
import { fetchUserEmotes } from "@/actions/fetchUserEmotes.";

const EditorProjectIdPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/signin');
  }

  const emotes = await fetchUserEmotes(userId);

  return (
    <>
      <Editor userId={userId} emotes={emotes} />
    </>
  );
};

export default EditorProjectIdPage;