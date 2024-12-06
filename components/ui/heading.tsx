import React from 'react'
interface HeadingProps {
    title: string;
    description: string;
}

export const Heading: React.FC<HeadingProps> = ({
    title,
    description
}) => {
    return (
        <div>
            <p className='text-2xl font-bold tracking-tight sm:text-3xl'>{title}</p>
            <p className='text-xs text-muted-foreground sm:text-sm'>{description}</p>
        </div>
    )
}
