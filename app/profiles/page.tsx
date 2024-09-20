import ProfileCard from '@/components/ProfileCard';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Public Profiles | EmoteMaker.ai',
  description: 'Browse active public profiles of EmoteMaker.ai users',
};

async function PublicProfilesPage() {
  const profiles = await db.profile.findMany({
    where: {
      status: 'active',
      isPublic: true, // Only fetch public profiles
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Public Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
export default PublicProfilesPage;
