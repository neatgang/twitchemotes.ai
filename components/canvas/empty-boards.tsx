"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { toast } from "sonner"
import { useState } from "react"
import { useAuth } from "@clerk/nextjs" // Import useAuth to get the authenticated user
import { createBoard } from "@/actions/create-board" // Import the server action

export const EmptyBoards = () => {
    const [pending, setPending] = useState(false)

    const onClick = async () => {
        setPending(true)
        try {
            const board = await createBoard("");
            toast.success("Board created")
        } catch (error) {
            console.error(error) // Log the error for debugging
            toast.error("Failed to create a board")
        } finally {
            setPending(false)
        }
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            {/* <Image 
                src="/neat.svg"
                alt="Neat Logo"
                height={200}
                width={200}
            /> */}
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