"use client";


import { DialogTitle, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";

import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/canvas/use-api.mutation";
import { useRenameModal } from "@/store/use-rename-modal";

export const RenameModal = () => {

    const { mutate, pending } = useApiMutation(api.board.update);

    const {
        isOpen,
        initialValues,
        onClose
    } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (
        e, 
    ) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title
        })

        .then(() => {
            toast.success("Board title updated");
        })

        .catch(() => {
            toast.error("Failed to update board title");
        });

        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input 
                        disabled={false} 
                        required 
                        maxLength={60} 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={false} type="submit">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}