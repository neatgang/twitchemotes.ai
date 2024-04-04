import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/canvas/use-api.mutation"

import { useOrganization } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import Image from "next/image"
import { toast } from "sonner"

export const EmptyBoards = () => {

    const { organization } = useOrganization()
    const { mutate, pending }= useApiMutation(api.board.create)

    const onClick = () => {

        if (!organization) {
            return
        }

        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Board created")
        })
        .catch((error) => {
            toast.error("Failed to create a board")
        })
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/neat.svg"
                alt="Neat Logo"
                height={200}
                width={200}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg"> 
                    Create Board
                </Button>
            </div>
        </div>
    )
}   