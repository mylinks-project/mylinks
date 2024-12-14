import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react"
import { auth } from "@/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mylinks - Your Personalized Link Hub",
  description:
    "Create and share your personalized link collection with Mylinks. A simple and efficient way to connect your audience to everything you share.",
  keywords: [
    "Mylinks",
    "link sharing",
    "personalized link hub",
    "linktree alternative",
    "social media links",
    "link management",
    "store links",
    "social media links",
  ],
  authors: [{ name: "salub", url: "https://salub.netlify.app" }],
  openGraph: {
    title: "Mylinks - Your Personalized Link Hub",
    description:
      "Easily manage and share all your important links in one place with Mylinks. Perfect for creators, businesses, and individuals.",
    url: "https://my-links-app.vercel.app",
    siteName: "Mylinks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mylinks - Your Personalized Link Hub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mylinks - Your Personalized Link Hub",
    description:
      "Easily manage and share all your important links in one place with Mylinks. Perfect for creators, businesses, and individuals.",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <SessionProvider session={session} >

      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Analytics />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider >
  );
}
