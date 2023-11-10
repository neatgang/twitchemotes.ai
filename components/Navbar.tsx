"use client"


import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useBuyCredits } from "~/hooks/useBuyCredits";
// import { api } from "~/utils/api";
// import { Button } from "./Button";
// import { PrimaryLink } from "./PrimaryLink";


// import { PrimaryLink } from "./PrimaryLink";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { FreeCounter } from "./FreeCounter";
import { SubscriptionButton } from "./SubscriptionButton";

export const Navbar = ({
  apiLimitCount = 0,
  isPro = false
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
//   const session = useSession();
//   const { buyCredits } = useBuyCredits();

//   const isLoggedIn = !!session.data;

//   const credits = api.user.getCredits.useQuery(undefined, {
//     enabled: isLoggedIn,
//   });

  return (
    <header className="dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* <PrimaryLink href="/">Icon Generator</PrimaryLink> */}
        <Button variant="ghost">
          <Link href="/">EmoteMaker.ai</Link>
        </Button>
        <div className="flex items-center space-x-2">
        <FreeCounter 
          apiLimitCount={apiLimitCount} 
          isPro={isPro}
        />
        <UserButton 
          afterSignOutUrl="/"
        />
      </div>
      </div>
    </header>
  );
}

export default Navbar;
