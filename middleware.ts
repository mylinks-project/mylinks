import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { Redis } from '@upstash/redis';

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT = 20; // Max requests allowed
const WINDOW = 60; // Time window in seconds

export default auth(async (req) => {

    const { nextUrl } = req;
    const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";

    const isLoggedIn = !!req.auth;

    // Rate limiting for all routes (including /dashboard, /login, /register, etc.)
    if (!nextUrl.pathname.startsWith("/_next")) { // Avoid rate limiting Next.js static files
        const redisKey = `${clientIp}:${nextUrl.pathname}`;
        const requests = await redis.incr(redisKey);

        if (requests === 1) {
            await redis.expire(redisKey, WINDOW);
        }

        if (requests > RATE_LIMIT) {
            return new Response(
                JSON.stringify({
                    error: "Too many requests. Please try again later.",
                }),
                { status: 429, headers: { "Content-Type": "application/json" } }
            );
        }
    }

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);


    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && nextUrl.pathname.startsWith("/dashboard")) {
        return Response.redirect(new URL("/login", nextUrl));
    }

    return;

});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/login", "/register", "/dashboard"],
}