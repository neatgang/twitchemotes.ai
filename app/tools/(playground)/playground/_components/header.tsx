import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Settings, Share } from "lucide-react"

export function Header() {
    return (
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">EmoteMaker Playground</h1>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Settings className="size-4" />
                        <span className="sr-only">Settings</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh]">
                    {/* Configuration form code here... */}
                </DrawerContent>
            </Drawer>
            {/* <Button
                variant="outline"
                size="sm"
                className="ml-auto gap-1.5 text-sm"
            >
                <Share className="size-3.5" />
                Share
            </Button> */}
        </header>
    )
}