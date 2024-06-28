import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"

export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            {/* <Image 
                src="/neat.svg"
                alt="Neat Logo"
                height={200}
                width={200}
            /> */}
            <h2 className="text-2xl font-semibold mt-6">
                Welcome to Emoteboard
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create an organization to get started
            </p>
            <CreateOrganization />
            {/* <div className="mt-6">
                <Dialog>
                    <DialogTrigger>
                        <Button size="lg">
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                    </DialogContent>
                </Dialog>
            </div> */}
        </div>
    )
}