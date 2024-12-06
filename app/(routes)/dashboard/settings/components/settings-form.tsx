"use client";

import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import ImageUpload from '@/components/ui/image-upload';
import { User } from '@/types/types';
import { PasswordDialog } from '@/components/ui/change-password-dialog';
import { DeleteAccountDialog } from '@/components/ui/delete-account-dialog';
import { useToast } from "@/hooks/use-toast";
import { FormError } from '@/components/auth/form-error';
import { logout } from '@/actions/logout';
import { LogOut } from 'lucide-react';

interface SettingsFormProps {
    initialData: User;
}

const formSchema = z.object({
    id: z.string(),
    name: z.string().min(3),
    username: z.string().min(3),
    email: z.string().email(),
    image: z.string().optional(),
});

type SettingFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {

    const router = useRouter();
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/user/${initialData.id}`, data)
            toast({ title: "User updated" });
            router.refresh();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // AxiosError has response and data properties
                setIsError(error.response?.data?.message || "An error occurred");
                toast({
                    title: "Something went wrong",
                    description: error.response?.data?.message || "An unexpected error occurred"
                });
            } else {
                // Generic error handling for other error types
                setIsError("An unexpected error occurred");
                toast({
                    title: "Something went wrong",
                    description: "An unexpected error occurred"
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage user preferences"
                />
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                        <FormField
                            control={form.control}
                            name='image'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value ? [field.value] : []}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange('')}
                                            disabeld={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Username' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!initialData.isOAuth &&
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
                    </div>

                    <Button disabled={loading} className='ml-auto' type='submit'>Save changes</Button>
                    <Separator />
                    {initialData &&
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                            <div className='flex items-center'>
                                <h2>Id</h2>
                                <Badge variant={'destructive'} className='ml-2'>{initialData.id}</Badge>
                            </div>

                            <div className='flex items-center'>
                                <h2>Email</h2>
                                <Badge variant={'destructive'} className='ml-2'>{initialData.email}</Badge>
                            </div>
                            <div className='flex items-center'>
                                <h2>Created At</h2>
                                <Badge variant={'destructive'} className='ml-2'>{initialData.createdAt}</Badge>
                            </div>
                            <div className='flex items-center'>
                                <h2>Email Verified</h2>
                                {initialData.emailVerified ?
                                    <Badge variant={'destructive'} className='ml-2'>{initialData.emailVerified}</Badge>
                                    : <Badge variant={'destructive'} className='ml-2'>No</Badge>
                                }
                            </div>
                        </div>
                    }
                    <FormError message={isError} />
                </form>
            </Form>
            <Separator />
            <div className='flex justify-center items-center mt-4 gap-4 flex-wrap md:justify-start '>
                {!initialData.isOAuth &&
                    <PasswordDialog userId={initialData.id} />
                }
                <Button variant={'destructive'} onClick={() => logout()}><LogOut className='w-5 h-5 mr-1'/> Logout</Button>
                <DeleteAccountDialog userId={initialData.id} />
            </div>
        </>
    )
}