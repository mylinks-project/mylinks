import type { Metadata } from "next";
import { DashboardNavbar } from "@/components/dashboard/Dashboard-Navbar";

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
        <div className="mt-14">
            <DashboardNavbar/>
            {children}
        </div>
      )
}
