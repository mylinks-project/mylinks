import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mylinks - Profile ",
    description: "Mylinks Profile",
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="">
             <div className="fixed left-0 top-0 -z-10 h-full w-full">
                <div className="relative h-full w-full bg-white dark:bg-black ">
                    <div className="dark:animate-beam  dark:absolute dark:bottom-0 dark:left-0 dark:right-0 dark:top-0  dark:bg-[linear-gradient(to_right,#4f4f4f2e_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f2e_2px,transparent_2px)] dark:bg-[size:50px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                    </div>
                    <div className=" dark:absolute dark:left-0 dark:right-0 dark:top-[-10%  dark:h-[1000px] dark:w-[1000px]  dark:rounded-full dark:bg-[radial-gradient(circle_400px_at_50%_200px,#fbfbfb36,#000)]">
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                </div>
            </div>
            {children}
        </div>
      )
}
