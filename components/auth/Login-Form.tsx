"use client";

// import { CardWrapper } from '@/components/auth/card-wrapper';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';
// import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { Social } from './social-login';
import { login } from '@/actions/login';
import Image from 'next/image';
import logo from '../../assets/logo-base-256x256.png'

const LoginForm = () => {

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    // const [showTwoFactor, setShowTwoFactor] = useState(false);

    const [isPending, startTransition] = useTransition();
    const [isError, setIsError] = useState<string | undefined>("");
    const [isSuccess, setIsSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setIsError("");
        setIsSuccess("");
        startTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    setIsError(data?.error)
                }
                // if (data?.success) {
                //     form.reset();
                //     setIsSuccess(data?.success)
                // }
            }).catch(() => {
                setIsError("Something went wrong")
            })
        });

    }


    return (
        <div className='flex flex-col justify-center items-center w-full px-4 mt-5 mb-10 gap-y-3 md:flex-row md:gap-x-40 md:mt-10 '>
            <Image src={logo}
                alt="Logo-image"
                width={250}
                height={250}
                className=" w-1/4 max-w-xs hidden md:block md:w-2/4  "
            />
            <div className=" w-80 px-4 py-8 border rounded-md  bg-white dark:bg-black md:w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type='email' placeholder="johndoe@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className='flex justify-between items-center'>
                                        <FormLabel>Password</FormLabel>
                                        <Button
                                            disabled={isPending}
                                            size={"sm"}
                                            variant={"link"}
                                            className='px-0 font-normal'
                                        >
                                            <Link
                                                href={'/auth/reset'}
                                            >
                                                Forget Password?
                                            </Link>
                                        </Button>

                                    </div>
                                    <FormControl>
                                        <Input disabled={isPending} type='password' placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <Button
                                        disabled={isPending}
                                        size={"sm"}
                                        variant={"link"}
                                        className='flex items-center justify-center p-0 font-normal'>
                                        <Link
                                            href={'/register'}
                                        >
                                            Dont have account?
                                        </Link>
                                    </Button>
                                </FormItem>
                            )}
                        />

                        <FormError message={isError || urlError} />
                        <FormSuccess message={isSuccess} />
                        <Button disabled={isPending} type="submit" className='w-full bg-white border text-black hover:bg-gray-50 hover:opacity-90' >
                            {isPending && <ClipLoader color="black" size={20} className="mr-2" />}
                            Sign in with Email
                        </Button>
                        <div className="flex items-center justify-center ">
                            <div className="border-t border-gray-300 flex-grow"></div>
                            <span className="mx-2 text-sm text-gray-500">OR CONTINUE WITH</span>
                            <div className="border-t border-gray-300 flex-grow"></div>
                        </div>
                        <Social />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default LoginForm;
