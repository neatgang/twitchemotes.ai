"use client"


import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useBuyCredits } from "~/hooks/useBuyCredits";
// import { api } from "~/utils/api";
// import { Button } from "./Button";
// import { PrimaryLink } from "./PrimaryLink";


// import { PrimaryLink } from "./PrimaryLink";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FreeCounter } from "./FreeCounter";
import { SubscriptionButton } from "./SubscriptionButton";
import { Avatar, AvatarImage } from "./ui/avatar";
import { LandingMobileNavbar } from "./LandingMobileNav";
import { UserAccountNav } from "./UserAccountNav";

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
      <nav className="flex items-center justify-center">
        <LandingMobileNavbar />
        {/* <div className="sm:hidden"> */}
        <Button variant="link">
          <Avatar className="mr-2">
            <AvatarImage src="/peepopainter.jpg"/>
          </Avatar>
          <Link href="/">EmoteMaker.ai</Link>
        </Button>
        <div className="md:block hidden">
        <Button variant="ghost">
          <Link href="/emotes">Create Emotes</Link>
        </Button>
        <Button variant="ghost">
          <Link href="/imagetoprompt">Generate Prompts</Link>
        </Button>
        <Button variant="ghost">
          <Link href="/marketplace">View Marketplace</Link>
        </Button>
        </div>
      </nav>
      <div className="flex items-center space-x-2">
        <SignedIn>
          <FreeCounter 
            apiLimitCount={apiLimitCount} 
            isPro={isPro}
          />
          {/* <UserButton 
            afterSignOutUrl="/"

          /> */}
          <UserAccountNav isPro={isPro}/>
        </SignedIn>
        <SignedOut>
          <Button variant="ghost">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  </header>
);
}

export default Navbar;
