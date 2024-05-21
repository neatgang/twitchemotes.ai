import { Emote } from "@prisma/client";
import Image from "next/image";

interface EmoteDisplayProps {
  emotes: Emote[];
//   onSelectEmote: (emote: Emote) => void; // Add a callback prop for selecting an emote
}

const EmoteDisplay: React.FC<EmoteDisplayProps> = ({ emotes }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {emotes.map((emote) => (
        <div key={emote.id} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden" >
          <Image
            alt="Emote Thumbnail"
            className="w-full h-full object-cover"
            height={160}
            src={emote.imageUrl || "/placeholder.svg"}
            width={160}
          />
        </div>
      ))}
    </div>
  );
};

export default EmoteDisplay;