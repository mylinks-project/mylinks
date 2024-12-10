"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export type ClickColumn = {
    id: string;
    userId: string | null;
    visitId: string | null;
    ipAddress: string | null;
    country: string | null;
    city: string | null;
    postalCode: string | null;
    device: string | null;
    browser: string | null;
    referer: string | null;
    clickedAt: string;
}

export const columns: ColumnDef<ClickColumn>[] = [
    {
        accessorKey: "id",
        header: "Click id",
    },
    {
        accessorKey: "userId",
        header: "User Id",
    },
    {
        accessorKey: "linkId",
        header: "Link Id",
    },
    {
        accessorKey: "visitId",
        header: "Profile Visit Id",
    },
    {
        accessorKey: "ipAddress",
        header: "Ip Address",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "postalCode",
        header: "Postal Code",
    },
    {
        accessorKey: "device",
        header: "Device",
    },
    {
        accessorKey: "browser",
        header: "Browser",
    },
    {
        accessorKey: "referer",
        header: "Referer",
    },
    {
        accessorKey: "clickedAt",
        header: "Clicked At",
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
