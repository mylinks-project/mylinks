'use client';

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface ProfileLinkProps {
    userId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    url: string;
    platform: string | null;
    linkImage: string | null;
    gifImage: string | null;
    order: number;
    isVisible: boolean;
}

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
        <Link
            key={link.title}
            href={link.url}
            onClick={() => handleLinkClick(profileVisitId, link.id)}
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
                        className="rounded object-cover "
                        alt="Image"
                        width={42}
                        height={30}
                        loading={'eager'}
                    />
                }
            </Button>
        </Link>
    );
}
