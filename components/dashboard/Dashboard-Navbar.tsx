"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "../app/Mode-Toggle"
import { usePathname } from "next/navigation"
import { Avatar, AvatarImage } from "../ui/avatar"
import logoImage from '../../assets/logo-base-256x256.png'

export const DashboardNavbar = () => {

    const [dropdownMenu, setDropdownMenu] = React.useState(false);
    const pathName = usePathname();

    const routes = [
        {
            href: `/dashboard`,
            label: `Dashboard`,
            active: pathName === `/dashboard`,
        },
        {
            href: `/dashboard/profile-analytics`,
            label: `Profile Analytics`,
            active: pathName === `/dashboard/profile-analytics`,
        },
        {
            href: `/dashboard/links`,
            label: `Links`,
            active: pathName === `/dashboard/links`,
        },
    ]

    return (
        <header className='z-20 w-full border-b flex items-center justify-between dark:bg-black bg-white h-16 fixed top-0 px-5 sm:px-10'>
            <div>
                <Link href='/' className='flex items-center gap-x-2'>
                    <Avatar>
                        <AvatarImage src={logoImage.src} />
                    </Avatar>
                    <p className='text-lg font-bold font-mono sm:text-xl'>Mylinks</p>
                </Link>
            </div>
            <div className='hidden sm:flex items-center space-x-4 lg:space-x-6'>
                {routes.map((route) => (
                    <Link key={route.href} href={route.href} className={cn(`text-sm font-medium transition-colors hover:text-primary`, route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>{route.label}</Link>
                ))}
            </div>
            <div className="flex justify-center items-center gap-x-4">
                <ModeToggle />
                <Link href={'/dashboard/settings'}>
                    <button className='hidden h-10 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-gray-200 transition-colors sm:inline-flex hover:opacity-80 hover:bg-black/10 trans'>
                        Settings
                    </button>
                </Link>
            </div>
            <button
                onClick={() => setDropdownMenu(!dropdownMenu)}
                className='inline-flex h-10 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-gray-400 transition-colors sm:hidden hover:opacity-80'
                aria-label={dropdownMenu ? 'Close menu' : 'Open menu'}
            >
                {dropdownMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
            {dropdownMenu && (
                <div className="z-20 w-56 fixed top-16 right-4 border bg-white dark:bg-black sm:hidden">
                    <ul className="flex flex-col p-2 rounded-md">
                        {routes.map((route) => (
                            <li key={route.href}>
                                <Link
                                    href={route.href}
                                    onClick={() => setDropdownMenu(false)}
                                    className={cn(
                                        "block text-xs font-medium py-2 text-center hover:text-black sm:text-sm",
                                        route.active ? "text-black" : "text-neutral-500"
                                    )}
                                >
                                    {route.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href={'/dashboard/settings'} className="block text-xs font-medium py-2 text-center hover:text-black sm:text-sm">Settings</Link>
                        </li>
                    </ul>
                </div>
            )}
        </header >
    )
}