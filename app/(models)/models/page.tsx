import { getEmotes } from "@/actions/get-emotes";
import { auth } from "@clerk/nextjs/server";
import ModelPageClient from "@/components/models/model-page-client";

export default async function ModelsPage() {
  const { userId } = auth();
  if (!userId) {
    return null; // or redirect to login
  }

  const { emotes } = await getEmotes({ userId });

  return <ModelPageClient initialEmotes={emotes} />;
}