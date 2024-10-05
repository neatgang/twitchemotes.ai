import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    icon: LucideIcon
    label: string
    isActive?: boolean
    onClick: () => void
}

export const SidebarItem = ({ icon: Icon, label, isActive, onClick }: SidebarItemProps) => {
    return (
        <Button 
            variant="ghost" 
            onClick={onClick} 
            className={cn(
                "w-full h-14 p-0 flex items-center justify-center",
                isActive && "bg-muted text-primary"
            )}
        >
            <Icon className="h-6 w-6" />
        </Button>
    )
}