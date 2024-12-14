"use client";

import * as z from 'zod';
import axios from 'axios';
import { useState } from "react";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from './separator';
import { useToast } from '@/hooks/use-toast';
import { FormError } from '../auth/form-error';
import { ResetPasswordSchema } from '@/schemas';

export function PasswordDialog({ userId }: { userId: string }) {
    const { toast } = useToast();
    const [isError, setIsError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
        try {
            setLoading(true);
            await axios.put(`/api/user/${userId}`, values);
            toast({ title: 'Successly changed password' });
            form.reset();
            setIsOpen(false);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setIsError(error.message);
                toast({
                    title: "Something went wrong",
                    description: error.message,
                });
            } else {
                setIsError("An unexpected error occurred.");
                toast({
                    title: "Something went wrong",
                    description: "An unexpected error occurred.",
                });
            }
        } finally {
            setLoading(false);
        }
    }



    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>
                <Button variant={'destructive'}>
                    <Link className="h-4 w-4 mr-1" />
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Change Password
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type={'password'} placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New password</FormLabel>
                                    <FormControl>
                                        <Input type={'password'} placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New password</FormLabel>
                                    <FormControl>
                                        <Input type={'password'} placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={isError} />
                        <div className="flex justify-end space-x-2">
                            <DialogClose asChild>
                                <Button disabled={loading} variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type={'submit'} disabled={loading} >
                                Change Password
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}