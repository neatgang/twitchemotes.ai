import Image from "next/image";
import Link from "next/link";

interface EmoteCardProps {
  id: string;
  imageUrl: string;
  prompt: string | null;
}

export const EmoteCard = ({ id, imageUrl, prompt }: EmoteCardProps) => {
  return (
    // <Link href={`/emotes/${id}`}>
      <div className="group hover:shadow-lg transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-square rounded-md">
          <Image fill className="object-cover" src={imageUrl || ""} alt={prompt || ""} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium">
            {prompt}
          </div>
        </div>
      </div>
    // </Link>
  );
};