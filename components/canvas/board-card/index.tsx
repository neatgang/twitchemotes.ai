

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth, useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";
import { Edit, Trash, Share2 } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
interface BoardCardProps {
    title: string;
    id: string;
    createdAt: Date;
    imageUrl: string | null; // Allow null
}

export const BoardCard = ({
    title,
    id,
    imageUrl,
    createdAt
}: BoardCardProps) => {
    // const { userId } = useUser();
    // const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

    return (
        <Link href={`/tools/whiteboard/${id}`} className="block">
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-[#99d8f5]/10">
            {imageUrl && (
  <Image
    src={imageUrl}
    alt={title}
    fill={true}
    className="object-cover"
  />
)}
                <Overlay />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <Edit size={16} />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <Trash size={16} />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <Share2 size={16} />
                    </button>
                </div>
            </div>
            {/* <Footer 
                title={title}
                // authorLabel={authorLabel}
                createdAtLabel={createdAtLabel}
                isFavorite={isFavorite}
                orgId={orgId}
            /> */}
        </div>
        </Link>
    )
}