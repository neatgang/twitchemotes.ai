import { db } from '@/lib/db';
import ProfileCard from '@/components/ProfileCard';

export const metadata = {
  title: 'Public Profiles | EmoteMaker.ai',
  description: 'Browse active public profiles of EmoteMaker.ai users',
};

async function PublicProfilesPage() {
  const profiles = await db.profile.findMany({
    where: {
      status: 'active',
      isPublic: true,
    },
    include: {
      user: true,
    },
  });

  const formattedProfiles = profiles.map(profile => ({
    id: profile.id,
    name: profile.name ?? profile.user?.name ?? undefined,
    image: profile.imageUrl ?? profile.user?.image ?? undefined,
    bio: profile.bio ?? undefined,
    social: {
      twitch: profile.twitch ?? undefined,
      youtube: profile.youtube ?? undefined,
      instagram: profile.instagram ?? undefined,
      twitter: profile.twitter ?? undefined,
    },
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Public Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {formattedProfiles.map((profile) => (
          <ProfileCard key={profile.id} user={profile} />
        ))}
      </div>
    </div>
  );
}

export default PublicProfilesPage;
