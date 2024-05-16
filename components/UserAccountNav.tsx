'use client'

import Link from 'next/link'


// import { UserAvatar } from '@/components/UserAvatar'
import { MessageCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { User } from '@prisma/client'
import { UserAvatar } from './UserAvatar'
import { useUser } from '@clerk/nextjs'
import { SubscriptionButton } from './SubscriptionButton'

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

    const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user?.firstName || null, image: user?.imageUrl || null }}
          className='h-8 w-8'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.firstName && <p className='font-medium'>Hey, {user?.firstName}</p>}
            {/* {user?.emailAddresses || '' && (
              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                {user?.emailAddresses}
              </p>
            )} */}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/emotes'>Create Emotes</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/imagetoprompt'>Generate Prompts</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/profile'>View Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='https://discord.gg/sVPGxbnM'>Join our Discord</Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
            <SubscriptionButton isPro={isPro} />
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {/* <DropdownMenuItem
          className='cursor-pointer'
        //   onSelect={(event) => {
        //     event.preventDefault()
        //     signOut({
        //       callbackUrl: `${window.location.origin}/sign-in`,
        //     })
        //   }}
          >
          Sign out
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
