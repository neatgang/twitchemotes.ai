// "use client"


// import Link from "next/link";
// // import { signIn, signOut, useSession } from "next-auth/react";
// // import { useBuyCredits } from "~/hooks/useBuyCredits";
// // import { api } from "~/utils/api";
// // import { Button } from "./Button";
// // import { PrimaryLink } from "./PrimaryLink";


// // import { PrimaryLink } from "./PrimaryLink";
// import { Button } from "./ui/button";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { FreeCounter } from "./FreeCounter";
// import { SubscriptionButton } from "./SubscriptionButton";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { LandingMobileNavbar } from "./LandingMobileNav";
// import { UserAccountNav } from "./UserAccountNav";
// import { CreditsDisplay } from "./CreditsDisplay";

// export const Navbar = ({
//   apiLimitCount = 0,
//   isPro = false,
//   credits = 0
// }: {
//   apiLimitCount: number;
//   isPro: boolean;
//   credits: number;
// }) => {
// //   const session = useSession();
// //   const { buyCredits } = useBuyCredits();

// //   const isLoggedIn = !!session.data;

// //   const credits = api.user.getCredits.useQuery(undefined, {
// //     enabled: isLoggedIn,
// //   });

// return (
//   <header className="dark:bg-gray-900">
//     <div className="container mx-auto flex h-16 items-center justify-between px-4">
//       <nav className="flex items-center justify-center">
//         <LandingMobileNavbar />
//         {/* <div className="sm:hidden"> */}
//         <Button variant="link">
//           <Avatar className="mr-2">
//             <AvatarImage src="/peepopainter.jpg"/>
//           </Avatar>
//           <Link href="/">EmoteMaker.ai</Link>
//         </Button>
//         <div className="md:block hidden">
//         <Button variant="ghost">
//           <Link href="/emotes">Create Emotes</Link>
//         </Button>
//         <Button variant="ghost">
//           <Link href="/imagetoprompt">Generate Prompts</Link>
//         </Button>
//         <Button variant="ghost">
//           <Link href="/showcase">Showcase</Link>
//         </Button>
//         {/* <Button variant="ghost">
//           <Link href="https://shop.emotemaker.ai">Shop</Link>
//         </Button> */}
//         </div>
//       </nav>
//       <div className="flex items-center space-x-2">
//         <SignedIn>
//         <CreditsDisplay credits={credits} />
//           {/* <FreeCounter 
//             apiLimitCount={apiLimitCount} 
//             isPro={isPro}
//           /> */}
//           {/* <UserButton 
//             afterSignOutUrl="/"

//           /> */}
//           <UserAccountNav isPro={isPro}/>
//         </SignedIn>
//         <SignedOut>
//           <Button variant="ghost">
//             <Link href="/sign-in">Login</Link>
//           </Button>
//         </SignedOut>
//       </div>
//     </div>
//   </header>
// );
// }

// export default Navbar;

"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "./ui/avatar";
import { LandingMobileNavbar } from "./LandingMobileNav";
import { UserAccountNav } from "./UserAccountNav";
import { CreditsDisplay } from "./CreditsDisplay";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const emoteTypes = [
  { name: "Pixel Emotes", link: "/pixels" },
  { name: "Kawaii Emotes", link: "/kawaii" },
  { name: "Object Emotes", link: "/objects" },
  { name: "Cute Bold Line Emotes", link: "/cuteboldlines" },
  { name: "Text Based Emotes", link: "/textbased" },
  { name: "3D Based Emotes", link: "/3d" },
  { name: "Pepe Based Emotes", link: "/pepethefrog" },
  { name: "Sticker Based Emotes", link: "/stickers" },
  { name: "Chibi Emotes", link: "/chibi" },
  { name: "Meme Emotes", link: "/meme" }
];

const tools = [
  { name: "Remove Background", link: "/tools/remove-background" },
  { name: "Image to Prompt", link: "/tools/imagetoprompt" },
  { name: "Whiteboard", link: "/tools/whiteboard" },
];

export const Navbar = ({
  apiLimitCount = 0,
  isPro = false,
  credits = 0
}: {
  apiLimitCount: number;
  isPro: boolean;
  credits: number;
}) => {
  return (
    <header className="dark:bg-gray-900 w-full flex items-center p-4 h-[68px] gap-x-8 border-b z-50 relative">
      <div className="mx-auto flex h-16 items-center justify-between w-full">
        <nav className="flex items-center">
          <LandingMobileNavbar />
          <NavigationMenu className="flex items-center">
            <Button variant="link" className="flex items-center">
              <Link href="/" className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src="/peepopainter.jpg" />
                </Avatar>
                <span className="text-lg font-semibold">EmoteMaker.ai</span>
              </Link>
            </Button>
            <Button variant="ghost" className="hidden sm:block">
              <Link href="/emoteboard/editor/1">Emoteboard</Link>
            </Button>
            <NavigationMenuList className="hidden sm:flex">
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <a>Create Emotes</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="mt-0 flex">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {emoteTypes.map((type) => (
                      <ListItem
                        key={type.name}
                        title={type.name}
                        href={type.link}
                      >
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <a>Tools</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="mt-0 flex">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {tools.map((type) => (
                      <ListItem
                        key={type.name}
                        title={type.name}
                        href={type.link}
                      >
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
            </NavigationMenuList>
            <Button variant="ghost" className="hidden sm:block">
              <Link href="/showcase">Showcase</Link>
            </Button>
          </NavigationMenu>
        </nav>
        <div className="flex items-center space-x-2">
          <SignedIn>
            <CreditsDisplay credits={credits} />
            <UserAccountNav isPro={isPro} />
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
};

export default Navbar;

import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure you have a utility function to handle classnames

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";