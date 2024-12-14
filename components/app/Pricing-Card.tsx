'use client';
import React, { useRef, useState } from 'react';

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { PricingCardProps } from '@/types/types';


const PricingCard = ({ plans }: { plans: PricingCardProps }) => {
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
            className='relative flex items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r dark:from-black dark:to-gray-950 from-white to-gray-150 px-8 py-16 shadow-2xl dark:text-white text-black '
        >
            <div
                className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 50%)`,
                }}
            />
            <div
                key={plans.name}
                className='space-y-6'
            >
                <div className="text-center ">
                    <h3 className="text-lg font-semibold mb-2">{plans.name}</h3>
                    <div className="mb-4">
                        <span className="text-4xl font-bold">${plans.price}</span>
                        {plans.price > 0 && <span className="text-muted-foreground">/mo</span>}
                    </div>
                    <Link href={'/register'}>
                        <Button className={'w-full animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-gray-200 transition-colors sm:inline-flex hover:opacity-80 hover:bg-black/10 trans'}>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <ul className="space-y-3 text-sm">
                    {plans.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                            <Check className="h-4 w-4 text-primary mr-2" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <p className='className="space-y-3 text-xs'>
                    {plans.description}
                </p>
            </div>
        </div>
    );
};

export default PricingCard;
