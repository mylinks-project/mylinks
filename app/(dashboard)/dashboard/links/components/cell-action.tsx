"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LinkColumn } from '@/types/types';
import { Button } from "@/components/ui/button";
import { Copy, Edit, Link, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/ui/alert-modal";
import { useToast } from "@/hooks/use-toast";

interface CellActionProps {
    data: LinkColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({ title: 'Link Id copied to the clipboard.' });
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/link/${data.id}`);
            router.refresh();
            // router.push('/')
            toast({ title: "Link Deleted Successfully" });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError has response and data properties
                toast({
                    title: "Something went wrong",
                    description: error.response?.data?.message || "An unexpected error occurred"
                });
            } else {
                toast({
                    title: "Something went wrong",
                    description: "An unexpected error occurred"
                });
            }
        } finally {
            setLoading(false);
            setOpen(false)
        }
    }

    useEffect(() => {
        router.refresh();

    })

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/${data.username}`)}>
                        <Link className="mr-2 h-4 w-4" />
                        View User Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Link Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data.url)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Url
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/links/${data.id}/clicks`)}>
                        <Link className="mr-2 h-4 w-4" />
                        View Link Clicks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/settings`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/links/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Link
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}