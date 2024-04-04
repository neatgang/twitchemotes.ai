"use client"

import { Loader2Icon, PersonStanding } from "lucide-react"
import Image from "next/image"

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Loader2Icon className="h-5 w-5 animate-spin" />
        </div>
    )
}