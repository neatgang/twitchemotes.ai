"use client"

import { BoardList } from "@/components/canvas/boardlist";
import { EmptyOrg } from "@/components/canvas/empty-org";
import { useOrganization } from "@clerk/nextjs"
import { OldPlayground } from "../playground/_components/oldplayground";



interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    }
}

const PlaygroundPage = ({
    searchParams,
}: DashboardPageProps) => {


    return (
     <div>
        <OldPlayground />
     </div>
    )
}

export default PlaygroundPage