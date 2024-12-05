"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu, X } from "lucide-react"
import { Button } from "../ui/button"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Centralized Link Management",
        href: "/features",
        description: "Store and organize all your important links in one convenient location."
    },
    {
        title: "Categorize Links",
        href: "/features",
        description: "Group your links into customizable categories for easier navigation and retrieval."
    },
    {
        title: "Collaborative Sharing",
        href: "/features",
        description: "Share your link collections with others, enabling seamless collaboration."
    },
    {
        title: "Link Analytics",
        href: "/features",
        description: "Track the performance of your links, including clicks, user locations, and devices."
    },
    {
        title: "Customizable Link Appearance",
        href: "/features",
        description: "Personalize how your links look with custom titles and descriptions."
    },
    {
        title: "Secure Access",
        href: "/features",
        description: "Protect your links with passwords and ensure privacy with advanced encryption."
    }
];

export const Navbar = () => {

    const [dropdownMenu, setDropdownMenu] = React.useState(false);


    return (
        <header className='z-20 w-full border-b flex items-center justify-between dark:bg-black bg-white h-16 fixed top-0 px-5 sm:px-10'>
            <div>
                <Link href='/' className='flex items-center gap-x-2'>
                    <p className='text-lg font-bold font-mono sm:text-xl'>Mylinks</p>
                </Link>
            </div>
            <div className='hidden sm:flex items-center space-x-4 lg:space-x-6'>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    Mylinks
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    The ultimate platform for managing and organizing all your links in one place, with advanced features to streamline your link management and sharing experience.
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/features" title="Features">
                                        Discover powerful tools to organize, manage, and track your links effortlessly.
                                    </ListItem>
                                    <ListItem href="/pricing" title="Pricing">
                                        Flexible pricing plans to suit your personal and professional link management needs.
                                    </ListItem>
                                    <ListItem href="/about" title="About Us">
                                        Learn more about our mission and what makes us the ultimate platform for link organization.
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/pricing" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Pricing
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu >
            </div>
            <div className="flex justify-center items-center gap-x-4">
                <Link href={'/register'}>
                    <Button className='hidden h-10 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-200 transition-colors sm:inline-flex hover:opacity-80 hover:bg-black/10 trans'>
                        Sign Up
                    </Button>
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
                <div className="z-20 w-56 fixed top-16 right-4 border bg-white dark:bg-black text-black dark:text-white sm:hidden">
                    <ul className="flex flex-col p-2 rounded-md">
                        {components.map((route) => (
                            <li key={route.href}>
                                <Link
                                    href={route.href}
                                    onClick={() => setDropdownMenu(false)}
                                    className={cn(
                                        "block text-xs font-medium py-2 text-center hover:text-black sm:text-sm",
                                        // route.active ? "text-black" : "text-neutral-500"
                                    )}
                                >
                                    {route.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header >
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
