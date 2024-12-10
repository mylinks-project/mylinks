"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
// import Image from "next/image";

export type LinkColumn = {
    id: string;
    title: string;
    url: string;
    platform?: string | null; 
    order: number | null; 
    isVisible: boolean | null;
    userId: string | null; 
    clicks: number | null; 
    createdAt: string;
}

export const columns: ColumnDef<LinkColumn>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "url",
        header: "Url",
    },
    {
        accessorKey: "platform",
        header: "Platform",
    },
    {
        accessorKey: "order",
        header: "In Order",
    },
    {
        accessorKey: "isVisible",
        header: "Is Visible",
    },
    {
        accessorKey: "clicks",
        header: "Clicks",
    },
    
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        header: "Actions",
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
