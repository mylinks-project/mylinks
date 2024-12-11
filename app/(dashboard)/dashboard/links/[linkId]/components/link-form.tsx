"use client";

import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from "@/components/ui/alert-modal";
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { FormError } from '@/components/auth/form-error';
import { Trash } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';

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
    linkImage: z.string().optional(),
});

type LinkFormValues = z.infer<typeof formSchema>

type TemplateKey = keyof typeof templates; // "Instagram" | "Twitter" | "YouTube"

const templates = {
    Instagram: {
        platform: "Instagram",
        title: "My Instagram Profile",
        url: "https://instagram.com/yourusername",
        linkImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png?20210403190622'
    },
    Twitter: {
        platform: "Twitter",
        title: "My Twitter Profile",
        url: "https://twitter.com/yourusername",
        linkImage: 'https://www.logo.wine/a/logo/Twitter/Twitter-Logo.wine.svg'
    },
    YouTube: {
        platform: "YouTube",
        title: "My YouTube Channel",
        url: "https://youtube.com/channel/yourchannel",
        linkImage: 'https://t3.ftcdn.net/jpg/04/74/05/94/360_F_474059464_qldYuzxaUWEwNTtYBJ44VN89ARuFktHW.jpg'
    },
    GitHub: {
        platform: "GitHub",
        title: "My GitHub",
        url: "https://github.com/",
        linkImage: 'https://www.logo.wine/a/logo/GitHub/GitHub-Logo.wine.svg'
    },
    OnlyFans: {
        platform: "OnlyFans",
        title: "My OnlyFans",
        url: "https://youtube.com/channel/yourchannel",
        linkImage: 'https://i.pinimg.com/736x/db/61/06/db61064824c35478f29de95608312454.jpg'
    },
    WebSite: {
        platform: "WebSite",
        title: "My WebSite",
        url: "https://",
        linkImage: 'https://t4.ftcdn.net/jpg/01/33/48/03/240_F_133480376_PWlsZ1Bdr2SVnTRpb8jCtY59CyEBdoUt.jpg'
    },
};

export const LinkForm: React.FC<LinkFormProps> = ({
    initialData,
}) => {

    const { toast } = useToast();
    const params = useParams();
    const router = useRouter();

    const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey | null>(null);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState('');


    const applyTemplate = (template: TemplateKey) => {
        form.reset(templates[template]);
        setSelectedTemplate(template);
    };

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
                linkImage: ''
            }
            : {
                url: '',
                title: '',
                platform: '',
                order: 0,
                isVisible: true,
                linkImage: ''
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

            <div className='flex justify-center items-center space-x-4'>
                <h2>Select Default templete</h2>
                {Object.keys(templates).map((key) => (
                    <Button
                        key={key}
                        variant={selectedTemplate === key ? 'default' : 'outline'}
                        onClick={() => applyTemplate(key as keyof typeof templates)}  // Type assertion here
                    >
                        {key}
                    </Button>
                ))}
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
                                    <div className='flex flex-col'>
                                        <FormLabel className="flex items-center gap-x-2">
                                            Link Visible (optional)
                                        </FormLabel>
                                        <FormDescription>This link will be visible in your profile</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='linkImage'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link Image</FormLabel>
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