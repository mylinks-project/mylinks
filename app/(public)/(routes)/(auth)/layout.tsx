'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
            <div className="mx-4 pt-20 pb-5">
                {children}
            </div>
        </GoogleReCaptchaProvider>
    )
}
