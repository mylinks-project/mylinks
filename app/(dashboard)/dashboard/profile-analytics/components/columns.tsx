"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { ProfileVisitColumn } from "@/types/types";

export const columns: ColumnDef<ProfileVisitColumn>[] = [
    {
        accessorKey: "id",
        header: "Visit Id",
    },
    {
        accessorKey: "userId",
        header: "User Id",
    },
    {
        accessorKey: "visitorId",
        header: "Visitor Id",
    },
    {
        accessorKey: "clicks",
        header: "Total Clicks",
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
        accessorKey: "visitAt",
        header: "Visit At",
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
