"use server";

import * as z from 'zod';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { verifyRecaptcha } from '@/lib/verifyCaptcha';

// Validation schema for input
const LoginSchema = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
  });

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { email, password, recaptchaToken } = validatedFields.data;

    try {
        const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
        if (!isRecaptchaValid) {
            return { error: "reCAPTCHA verification failed. Please try again." }
        }
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credientials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
}