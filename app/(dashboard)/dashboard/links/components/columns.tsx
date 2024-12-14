"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import Image from "next/image";
// import Image from "next/image";

export type LinkColumn = {
    id: string;
    name?: string | null,
    username?: string | null,
    userImage?: string | null,
    title: string;
    url: string;
    platform?: string | null;
    linkImage?: string | null;
    gifImage?: string | null;
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
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "userImage",
        header: "User Image",
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.original.userImage ?
                    <Image
                        src={row.original.userImage}
                        className="rounded border object-cover"
                        alt="Image"
                        width={80}
                        height={80}
                    />
                    : <h2>No Image</h2>
                }
            </div>
        )
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
        accessorKey: "linkImage",
        header: "Link Image",
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.original.linkImage ?
                    <Image
                        src={row.original.linkImage}
                        className="rounded border object-cover"
                        alt="Image"
                        width={80}
                        height={80}
                    />
                    : <h2>No Image</h2>
                }

            </div>
        )
    },
    {
        accessorKey: "gifImage",
        header: "Gif Image",
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.original.gifImage ?
                    <Image
                        src={row.original.gifImage}
                        className="rounded border object-cover"
                        alt="Image"
                        width={80}
                        height={80}
                    />
                    : <h2>No Image</h2>
                }

            </div>
        )
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
