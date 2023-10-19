"use client"


import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useBuyCredits } from "~/hooks/useBuyCredits";
// import { api } from "~/utils/api";
// import { Button } from "./Button";
// import { PrimaryLink } from "./PrimaryLink";


// import { PrimaryLink } from "./PrimaryLink";
import { Button } from "./ui/button";

export function Header() {
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
        <ul className="flex gap-4">
          <li>
            <Button variant="ghost">
              <Link href="/generate">Generate</Link>
            </Button>
          </li>
          <li>
          <Button variant="ghost">
              <Link href="/community">Community</Link>
            </Button>
          </li>
          {/* {isLoggedIn && ( */}
            <li>
            <Button variant="ghost">
              <Link href="/collection">Collection</Link>
            </Button>
            </li>
          {/* )} */}
        </ul>
        <ul className="flex gap-4">
          {/* {isLoggedIn && ( */}
            <>
              <div className="flex items-center">
                Credits remaining 
                {/* {credits.data} */}
              </div>
              <li>
                <Button
                  // onClick={() => {
                  //   buyCredits().catch(console.error);
                  // }}
                >
                  Buy Credits
                </Button>
              </li>
              <li>
                <Button
                  variant="secondary"
                  // onClick={() => {
                  //   signOut().catch(console.error);
                  // }}
                >
                  Logout
                </Button>
              </li>
            </>
          {/* )} */}
          {/* {!isLoggedIn && ( */}
            <li>
              <Button
                // onClick={() => {
                //   signIn().catch(console.error);
                // }}
              >
                Login
              </Button>
            </li>
          {/* )} */}
        </ul>
      </div>
    </header>
  );
}
