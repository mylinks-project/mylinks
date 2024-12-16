'use client';

import { useRef, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export interface ProfileLinkProps {
    user:{
        url: string;
    title: string | null;
    platform: string | null;
    linkImage: string | null;
    gifImage: string | null;
}
}

export const UserHoverCard: React.FC<ProfileLinkProps> = ({ user }) => {

    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };


    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='relative flex items-center justify-center overflow-hidden rounded-sm border border-gray-800 bg-gradient-to-r dark:from-black dark:to-gray-950 from-white to-gray-150 px-4 py-6 shadow-2xl dark:text-white text-black '
        >
            <div
                className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 50%)`,
                }}
            />
            <Link
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-y-5 group dark:text-white text-black"
            >
                <div className="flex ">
                    {user.linkImage && (
                        <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                            <Image
                                src={user.linkImage}
                                alt={user.title ?? 'link Image'}
                                className="object-cover rounded-lg"
                                width={50}
                                height={50}

                            />
                        </div>
                    )}
                    <div className="flex-grow">
                        <h3 className="font-semibold dark:text-gray-300 text-black group-hover:text-blue-600">
                            {user.title}
                        </h3>
                        {user.platform && (
                            <p className="text-sm dark:text-gray-300 text-black group-hover:text-blue-600">{user.platform}</p>
                        )}
                    </div>
                    <ExternalLink className="ml-2 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" />
                </div>
                {user.gifImage && (
                    <div className="relative h-40 w-full ">
                        <Image
                            src={user.gifImage}
                            alt={`${user.title} preview`}
                            className="h-full w-full object-cover rounded-sm"
                            width={100}
                            height={100}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                )}
            </Link>
        </div >
    )
};
