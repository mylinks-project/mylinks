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
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from "@/components/ui/alert-modal";
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { FormError } from '@/components/auth/form-error';
import { Trash } from 'lucide-react';

interface LinkFormProps {
    initialData: LinkProps | null | undefined;
}

export type LinkProps = {
    id: string;
    title: string;
    url: string;
    platform?: string | null;
    order: number | null;
    isVisible: boolean | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const formSchema = z.object({
    url: z.string().url(),
    title: z.string().min(1, {
        message: "Title must be at least 1 characters.",
    }),
    platform: z.string().min(3, {
        message: "Platform must be at least 3 characters.",
    }).optional().or(z.literal("")),
    order: z.number(),
    isVisible: z.boolean().optional(),
});

type LinkFormValues = z.infer<typeof formSchema>

export const LinkForm: React.FC<LinkFormProps> = ({
    initialData,
}) => {

    const { toast } = useToast();
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState('');

    // const [qrCode, setQrCode] = useState(!!initialData?.updatedAt); // Use the initial value if editing

    const form = useForm<LinkFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                url: initialData.url ?? '',
                title: initialData.title ?? '',
                platform: initialData.platform ?? '',
                order: initialData.order ?? 0,
                isVisible: initialData.isVisible ?? false,
            }
            : {
                url: '',
                title: '',
                platform: '',
                order: 0,
                isVisible: false,
            },
    });

    const title = initialData ? 'Edit Post' : 'Create Post';
    const description = initialData ? 'Edit a Post' : 'Add a new Post';
    const toastMessage = initialData ? "Post updated." : "Post created.";
    const action = initialData ? "Save changes" : "Create Post";

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        try {
            setLoading(true);
            // const payload = { ...data, qrCode: qrCode ? true : false };
            if (initialData) {
                await axios.patch(`/api/link/${params.linkId}`, data)
            } else {
                await axios.post(`/api/link`, data)
            }
            toast({ title: toastMessage });
            router.refresh();
            router.push('/dashboard/links');
        } catch (error) {
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

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/link/${params.linkId}`);
            router.refresh();
            router.push('/dashboard/links')
            toast({ title: 'Link deleted' });
        } catch (error) {
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
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData &&
                    <Button
                        disabled={loading}
                        variant={'destructive'}
                        size={'icon'}
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                        <FormField
                            control={form.control}
                            name='url'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Url</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Enter your URL here...' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title (optional)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="eg- insta profile" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='platform'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Platform (optional)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Enter platform ex- Instgram ' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name='order'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>In Order (optional)</FormLabel>
                                    <FormControl>
                                        <Input type={'number'} disabled={loading} placeholder='eg- 0' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name='isVisible'
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow">
                                    <FormLabel className="flex items-center gap-x-2">
                                        Archive (optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="expiredAt"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Expire At (optional)</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of Link expiration.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {/* <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow">
                            <FormLabel className="flex items-center gap-x-2">
                                Qr Code (optional)
                            </FormLabel>
                            <FormControl>
                                <Checkbox
                                    checked={qrCode}
                                    onCheckedChange={(value: boolean) => setQrCode(value)}
                                />
                            </FormControl>
                        </FormItem> */}
                    </div>
                    <FormError message={isError} />
                    <Button disabled={loading} className='ml-auto' type='submit'>{action}</Button>
                </form>
            </Form>
            <Separator />

        </>
    )
}