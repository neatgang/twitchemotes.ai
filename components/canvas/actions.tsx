"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";


import ConfirmModal from "./confirm-modal";

// import { useRenameModal } from "@/store/use-rename-modal";
import { Button } from "../Button";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionsProps) => {

    // const { onOpen } = useRenameModal();
    // const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`,)
            .then(() => toast.success("Link copied to clipboard"))
            .catch(() => toast.error("Failed to copy link to clipboard"))
    }

    const onDelete = () => {
        // mutate({ id })
        //     .then(() => toast.success("Board deleted"))
        //     .catch(() => toast.error("Failed to delete board"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()} side={side} sideOffset={sideOffset}>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit board title
                </DropdownMenuItem> */}
                <ConfirmModal 
                    onConfirm={onDelete} 
                    // disabled={pending}
                    header="Delete board" 
                    description={`Are you sure you want to delete "${title}"?`}>
                <Button 
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal" 
                    variant="secondary"
                    // onClick={onDelete}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}