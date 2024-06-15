"use client"

import { BoardList } from "@/components/canvas/boardlist";
import { EmptyOrg } from "@/components/canvas/empty-org";
import { useOrganization } from "@clerk/nextjs"


interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    }
}

const DashboardPage = ({
    searchParams,
}: DashboardPageProps) => {

    const { organization } = useOrganization();

    return (
        <div className="flex h-[calc(100%-80px)] p-6 items-center justify-center">
            {!organization ? (
        <EmptyOrg />
            ) : (
            <div>
                <BoardList
                    orgId={organization.id}
                    query={searchParams}
                />
            </div>
            )}
        </div>
    )
}

export default DashboardPage