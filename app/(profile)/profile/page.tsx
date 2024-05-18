import { auth } from "@clerk/nextjs"
import ProfileEmotes from "./_components/ProfileEmotes"
import { db } from "@/lib/db";
import { EmoteHistoryCard } from "./_components/EmoteHistory";
import { ProfileCard } from "./_components/ProfileCard";
import { SocialLinksCard } from "./_components/SocialLinks";
import { Footer } from "./_components/Footer";
import { redirect } from "next/navigation";

const ProfilePage = async () => {

    const { userId } = auth();

    if (!userId) (
      redirect('/signin')
    )

    const profile = await db.profile.findUnique({
      where: {
        userId: userId || ''
      }
    })

    const emotes = await db.emote.findMany({
    where: {
      userId: userId,
    },
    include: {
        EmoteForSale: true,
    },
    orderBy: {
      createdAt: "desc",
    }
  });


  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* <Header /> */}
      <main className="flex-1 p-4 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <ProfileCard profile={profile} userId={userId!}/>
          </div>
          <div>
            <SocialLinksCard userId={userId!} profile={profile}/>
          </div>
        </div>
        <div className="py-4">
          <EmoteHistoryCard emotes={emotes} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage
