'use client';

import { Heading } from "@/components/ui/heading"
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ClickColumn } from "@/types/types";

interface ClickClientProps {
    data: ClickColumn[];
}

export const ClickClient: React.FC<ClickClientProps> = ({
    data
}) => {

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Clicks (${data.length})`}
                    description="Manage clicks preferences"
                />

            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"label"} />
            <Separator />
        </>
    )
}
