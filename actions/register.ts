"use server";

import * as z from 'zod';
import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';
import { getUserByEmail } from '@/lib/user';
import { verifyRecaptcha } from '@/lib/verifyCaptcha';

const RegisterSchema = z.object({
    name: z.string().min(2, {
        message: "Name is required"
    }),
    username: z.string().min(2, {
        message: "Username is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Atleast password should be 6 digits"
    }),
    recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
})

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { email, password, name, username, recaptchaToken } = validatedFields.data;

    try {

        console.log(recaptchaToken);
        

        const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);

        if (!isRecaptchaValid) {
            console.log(isRecaptchaValid);
            
            return { error: "reCAPTCHA verification failed.Please try again." }
        }

        const saltPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltPassword);

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return { error: "Email already in use" };
        }

        await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword
            }
        })

        // TODO : Send verification token email

        return { success: "User created!" }
    } catch (error) {
        throw error;
    }
}