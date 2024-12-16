import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfileLinkProps } from "@/types/types";
import {
    User
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { UserHoverCard } from '@/components/ui/User-Hover-Card';

export default function UserProfilePage({ user }: { user: UserProfileLinkProps }) {
    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-md mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <Avatar className="w-24 h-24 mx-auto border-4 border-primary">
                        <AvatarImage src={user?.userImage || ''} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                        <p className="text-muted-foreground"><span className="select-none">@</span>{user?.username}</p>
                    </div>
                    <p className="text-foreground/80">
                        {user?.bio}
                    </p>
                </div>
                <div className="space-y-4">
                    {user?.links.sort((a, b) => a.order - b.order).map((link) => (
                        <HoverCard key={link.id}>
                            <HoverCardTrigger>
                                <Link

                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-3 py-6 border hover:scale-105 h-10 animate-background-shine items-center rounded-md border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-200 transition-colors sm:inline-flex hover:opacity-80 hover:bg-black/10 trans"
                                    >
                                        {link.linkImage &&
                                            <Image
                                                src={link.linkImage}
                                                className="rounded object-cover"
                                                alt="Image"
                                                width={30}
                                                height={30}
                                            />
                                        }
                                        <span>{link.title}</span>
                                        {link.gifImage &&
                                            <Image
                                                src={link.gifImage}
                                                className="rounded object-cover max-w-[42px] max-h-[40px]"
                                                alt="Image"
                                                width={42}
                                                height={30}
                                                loading={'eager'}
                                            />
                                        }
                                    </Button>
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent className='p-0 m-0'>
                                <UserHoverCard user={link} />
                            </HoverCardContent>
                        </HoverCard>
                    ))}
                </div>
            </div>
        </main>
    );
}