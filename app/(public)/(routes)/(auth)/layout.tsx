import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication Page",
    description: "Securely log in or sign up to access your account.",
    keywords: ["Authentication", "Login", "Sign Up", "Secure Access"],
    openGraph: {
        title: "Authentication Page",
        description: "Securely log in or sign up to access your account.",
        type: "website"
    },
}

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="mx-4 pt-20 pb-5">{children}</div>;
}
