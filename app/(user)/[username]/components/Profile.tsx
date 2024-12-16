'use client';

import { Button } from "@/components/ui/button";
import { ProfileLinkProps } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { UserHoverCard } from '@/components/ui/User-Hover-Card';

const handleLinkClick = async (profileVisitId: string, linkId: string) => {
    try {
        await axios.post("/api/click", { linkId, profileVisitId });
        console.log("Click logged successfully");
    } catch (error) {
        console.error("Error logging click:", error);
    }
};

export default function ProfileLink({ link, profileVisitId }: { link: ProfileLinkProps; profileVisitId: string }) {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Link
                    key={link.title}
                    href={link.url}
                    onClick={() => handleLinkClick(profileVisitId, link.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-6 border hover:scale-105 h-10 animate-background-shine items-center rounded-md border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-200 transition-colors sm:inline-flex hover:text-gray-200 hover:bg-black/10 trans"
                    >
                        {link.linkImage &&
                            <Image
                                src={link.linkImage}
                                className="rounded border object-cover"
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
    );
}
