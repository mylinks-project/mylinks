"use client";

import { RegisterSchema } from '@/schemas';
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
import { useState, useTransition } from 'react';
import { register } from '@/actions/register';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Social } from './social-login';
import Image from 'next/image';
import logo from '../../assets/logo-base-256x256.png'

const RegisterForm = () => {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isError, setIsError] = useState<string | undefined>("");
    const [isSuccess, setIsSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            username: "",
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setIsError("");
        setIsSuccess("");
        startTransition(() => {
            register(values).then((data) => {
                if (data?.error) {
                    // form.reset();
                    setIsError(data?.error)
                }
                // console.log(data);
                if (data?.success) {
                    setIsSuccess(data?.success)
                    router.push('/login');
                    form.reset();
                }
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
                <Social />
                <div className="flex items-center justify-center my-4">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <span className="mx-2 text-sm text-gray-500">OR CONTINUE WITH</span>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Create an account</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type='name' placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type='username' placeholder="johndoe1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    <FormLabel>Password</FormLabel>
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
                                            href={'/login'}
                                        >
                                            Already have account?
                                        </Link>
                                    </Button>
                                </FormItem>
                            )}
                        />
                        <FormError message={isError} />
                        <FormSuccess message={isSuccess} />
                        <Button disabled={isPending} type="submit" className='w-full ' >
                            {isPending && <ClipLoader color="black" size={20} className="mr-2" />}
                            Create an Account
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default RegisterForm;



