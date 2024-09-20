'use client'

import Link from 'next/link'


// import { UserAvatar } from '@/components/UserAvatar'
import { MessageCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { User } from '@prisma/client'
import { UserAvatar } from './UserAvatar'
import { useClerk, useUser } from '@clerk/nextjs'
import { SubscriptionButton } from './SubscriptionButton'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Button } from './ui/button'

// interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
//   user: Pick<User, 'name' | 'image' | 'email'>
// }

// interface UserAccountNavProps {
//     isPro: any
// }

export const UserAccountNav = ({
    isPro = false
  }: {
    isPro: boolean;
  }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
      const { signOut } = useClerk();

      const onClick = async () => {
        try {
          setLoading(true);
      
          const response = await axios.get("/api/stripe/", {
            params: {
              isPro,
            },
          });
      
          window.location.href = response.data.url;
        } catch (error) {
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user?.firstName || null, image: user?.imageUrl || null }}
          className='h-8 w-8'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
        {/* <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.firstName && <p className='font-medium'>Hey, {user?.firstName}</p>}
            {user?.emailAddresses || '' && (
              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                {user?.emailAddresses}
              </p>
            )}
          </div>
        </div> */}
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem asChild>
          <Link href='/emotes'>Create Emotes</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/imagetoprompt'>Generate Prompts</Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem asChild>
          <Link href='/profile'>View Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='https://discord.gg/GSKRnD4hB6'>Join our Discord</Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
            {/* <SubscriptionButton isPro={isPro} /> */}

            {/* <Button variant={isPro ? "ghost" : "default"} disabled={loading} onClick={onClick} className="md:block w-full flex items-center">
  {isPro ? "Manage Subscription" : "Upgrade"}
  {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
</Button> */}
            {isPro ? (
            <Button onClick={onClick} className="w-full" >
             Manage Subscription
            </Button>
            ) : (
              <Link href="pricing">
                Upgrade
              </Link>
            )}

        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => signOut()}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
