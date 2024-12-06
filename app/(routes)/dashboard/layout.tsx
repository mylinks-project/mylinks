import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Mylinks Dashboard",
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="dark:bg-black bg-white mt-16">
            <div className="flex justify-center items-center gap-x-1 pt-6 ">
                <Link href={'/dashboard'}>
                    <Button>Dashboard</Button>
                </Link>
                <Link href={'/dashboard/settings'}>
                    <Button>Settings</Button>
                </Link>
            </div>
            {children}
        </div>
    )
}
