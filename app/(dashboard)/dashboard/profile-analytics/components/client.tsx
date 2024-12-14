'use client';

import { Heading } from "@/components/ui/heading"
import {  columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ProfileVisitColumn } from "@/types/types";

interface ProfileClientProps {
    data: ProfileVisitColumn[];
}

export const ProfileClient: React.FC<ProfileClientProps> = ({
    data
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Profile Analytics (${data.length})`}
                    description="Manage Analytics preferences"
                />
              
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"id"} />
            <Separator />
        </>
    )
}
