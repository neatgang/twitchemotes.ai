"use client";


import { Coins, CoinsIcon } from "lucide-react";

export const CreditsDisplay = ({ credits }: { credits: number }) => {
    return (
      <div className="text-sm font-semibold mx-2 flex">
            <Coins className="mx-2 w-4 h-4 flex" /> <p>{credits}</p>
            </div>
    );
  };