"use client";


import { Coins, CoinsIcon } from "lucide-react";
import Link from "next/link";

export const CreditsDisplay = ({ credits }: { credits: number }) => {
    return (
      <div className="text-sm font-semibold mx-2 flex">
        <Link href="/credits">
          <Coins className="mx-2 w-4 h-4 flex" /> <p>{credits}</p>
        </Link>
      </div>
    );
  };