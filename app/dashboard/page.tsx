import { Suspense } from 'react'
import { DashboardContent } from './_components/DashboardContent'
import { DashboardSkeleton } from './_components/DashboardSkeleton'
import { getUserCredits } from "@/actions/get-user-credits"
import { checkSubscription } from "@/lib/subscription"
import { redirect } from 'next/navigation'

import { ProfileFormDialog } from './_components/ProfileFormSheet' // Update this line
import { getProfile } from '@/actions/get-profile'

export default async function DashboardPage() {
  const credits = await getUserCredits()
  const isPro = await checkSubscription()
  const profile = await getProfile() // Fetch the user's profile

  if (!isPro) {
    redirect('/pricing')
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      {!profile && <ProfileFormDialog />}
      <DashboardContent credits={credits} />
    </Suspense>
  )
}