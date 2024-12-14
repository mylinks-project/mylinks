import * as z from 'zod';

export const SettingsSchema = z.object({
    id: z.string(),
    name: z.string().min(3),
    username: z.string().min(3),
    email: z.string().email(),
    bio: z.string().optional(),
    image: z.string().optional(),
});

export const ResetPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
        message: "New password must be at least 6 characters.",
    }),
    confirmNewPassword: z.string().min(6, {
        message: "Confirm new password must be at least 6 characters.",
    })
}).refine((data) => {
    if (data.newPassword !== data.confirmNewPassword) {
        return false;
    }

    return true;
}, {
    message: "New password And Confirm New Password should be same",
    path: ["confirmNewPassword"]
});

export const PasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string().min(6))
})

export const RegisterSchema = z.object({
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
})
