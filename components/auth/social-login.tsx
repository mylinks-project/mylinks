'use client'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ClipLoader } from 'react-spinners';
import { FaGoogle } from 'react-icons/fa';


export const Social = () => {

    const [isPending, setIsPending] = useState(false);

    const onClick = (provider: "google") => {
        try {
            setIsPending(true)
            signIn(provider, {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
        } catch (error) {
            console.error('An error occurred:', error);
            return null;
        } finally {
            setIsPending(false)
        }

    }

    return (
        <div className='flex items-center justify-center '>
            <Button size={'lg'} variant={'outline'} className='w-full' disabled={isPending} onClick={() => onClick('google')}>
                {isPending && <ClipLoader color="black" size={20} className="mr-2" />}
                <span>Sign In with</span> <FaGoogle />
            </Button>
        </div>
    )
}