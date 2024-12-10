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
        <div className="">
            <div className="flex justify-center items-center gap-x-1 pt-6 ">
                <Link href={'/dashboard'}>
                    <Button>Dashboard</Button>
                </Link>
                <Link href={'/dashboard/links'}>
                    <Button>Links</Button>
                </Link>
                <Link href={'/dashboard/profile-analytics'}>
                    <Button>Profile Analytics</Button>
                </Link>
                <Link href={'/dashboard/settings'}>
                    <Button>Settings</Button>
                </Link>
            </div>
            {children}
        </div>
      )
}
