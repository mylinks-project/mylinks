"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { ClickColumn } from "@/types/types";

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
