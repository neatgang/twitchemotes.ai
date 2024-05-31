"use client";

import { Coins } from "lucide-react";
import Link from "next/link";

export const CreditsDisplay = ({ credits }: { credits: number }) => {
    return (
      <div className="text-sm font-semibold mx-2 flex items-center">
        <Link href="/credits" className="flex items-center">
          <Coins className="mx-2 w-4 h-4" />
          <p>{credits}</p>
        </Link>
      </div>
    );
};