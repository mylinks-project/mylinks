'use client';

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { LinkColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface LinkClientProps {
    data: LinkColumn[];
}

export const LinkClient: React.FC<LinkClientProps> = ({
    data
}) => {

    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Links (${data.length})`}
                    description="Manage Link preferences"
                />
                <Button
                    onClick={() => router.push(`/dashboard/links/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Link
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"slug"} />
        </>
    )
}
