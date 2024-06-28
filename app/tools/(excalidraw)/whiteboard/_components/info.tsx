"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { db } from "@/lib/db"; // Import Prisma client

import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { Hint } from "@/components/canvas/hint";
import { Actions } from "@/components/canvas/actions";

interface InfoProps {
  boardId: string;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
      |
    </div>
  );
};

interface Board {
  id: string;
  title: string;
  orgId: string | null;
  authorId: string | null;
  authorName: string | null;
  imageUrl: string | null;
  createdAt: Date;
  userId: string;
}

export const Info = ({
  boardId,
}: InfoProps) => {
  const { onOpen } = useRenameModal();
  const [data, setData] = useState<Board | null>(null); // Update state type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const board = await db.board.findUnique({
          where: { id: boardId },
        });
        setData(board);
      } catch (error) {
        console.error("[INFO] Error fetching board data:", error);
      }
    };

    fetchData();
  }, [boardId]);

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild variant="default" className="px-2">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Board logo"
              height={40}
              width={40}
            />
            <span className={cn(
              "font-semibold text-xl ml-2 text-black",
              font.className,
            )}>
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="default"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data.id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={data.id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="default">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div 
      className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"
    />
  );
};