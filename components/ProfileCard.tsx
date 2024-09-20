import Image from 'next/image';
import Link from 'next/link';

function ProfileCard({ profile }: { profile: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Image
          src={profile.imageUrl || '/default-avatar.png'}
          alt={profile.name || 'User'}
          width={64}
          height={64}
          className="rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold">{profile.name || 'Anonymous User'}</h2>
      </div>
      <p className="text-gray-600 mb-4">{profile.bio || 'No bio provided'}</p>
      <div className="flex flex-wrap gap-2">
        {profile.twitch && (
          <Link href={`https://twitch.tv/${profile.twitch}`} className="text-purple-600 hover:underline">
            Twitch
          </Link>
        )}
        {profile.youtube && (
          <Link href={profile.youtube} className="text-red-600 hover:underline">
            YouTube
          </Link>
        )}
        {profile.instagram && (
          <Link href={`https://instagram.com/${profile.instagram}`} className="text-pink-600 hover:underline">
            Instagram
          </Link>
        )}
        {profile.twitter && (
          <Link href={`https://twitter.com/${profile.twitter}`} className="text-blue-400 hover:underline">
            Twitter
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;