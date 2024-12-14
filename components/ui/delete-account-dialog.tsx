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
    DialogDescription,
} from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { logout } from '@/actions/logout';
import { useToast } from '@/hooks/use-toast';
import { FormError } from '../auth/form-error';
import { PasswordSchema } from '@/schemas';

export function DeleteAccountDialog({ userId }: { userId: string }) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState('');

    const form = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof PasswordSchema>) => {
        try {
            setLoading(true);
            await axios.delete(`/api/user/${userId}`, { data: values });
            toast({ title: "User Deleted" });
            form.reset();
            logout();
            setIsOpen(false);
            router.refresh();
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
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle >
                        Delete Account
                    </DialogTitle>
                    <DialogDescription className='text-red-600'>This action cannot be undone. This will permanently delete the Account
                        and remove it from our servers.
                    </DialogDescription>
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
                        <FormError message={isError} />
                        <div className="flex justify-end space-x-2">
                            <DialogClose asChild>
                                <Button disabled={loading} variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type={'submit'} disabled={loading} >
                                Delete Account
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}