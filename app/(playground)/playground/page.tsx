"use client"

import { BoardList } from "@/components/canvas/boardlist";
import { EmptyOrg } from "@/components/canvas/empty-org";
import { useOrganization } from "@clerk/nextjs"
import { Playground } from "./_components/oldplayground";


interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    }
}

const PlaygroundPage = ({
    searchParams,
}: DashboardPageProps) => {

    const { organization } = useOrganization();

    return (
     <div>
        <Playground />
     </div>
    )
}

export default PlaygroundPage