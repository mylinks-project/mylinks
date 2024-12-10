import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
import { parse } from 'next-useragent';
import { getLocationData } from "@/lib/getLocation";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {

    try {
        const { userId } = await req.json();
        const session = await auth();
        const visitorId = session?.user.id;

        if (!userId) {
            console.log("UserId rot found!");
            return NextResponse.json({ error: "UserId rot found!" }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!user) {
            console.log("User rot found!");
            return NextResponse.json({ error: "User rot found!" }, { status: 400 });
        }

        // Step 2: Get request data (country, city, device, browser)
        const forwardedFor = req.headers.get("x-forwarded-for") || ""; // Get IP from headers
        const ip = forwardedFor.split(",")[0].trim() || req.headers.get('x-real-ip') || 'unknown'; 
        const dataLocation = await getLocationData(ip);

        const userAgentString = req.headers.get("user-agent") || "";  // Extract user-agent string
        const userAgent = parse(userAgentString);

        console.log("IP", ip, "Geo Info:", dataLocation, "User Agent:", userAgent);

        const profileVisit = await prisma.profileVisit.create({
            data: {
                userId: user.id,
                visitorId: visitorId || null,
                ipAddress: ip,
                country: dataLocation?.country || null,
                city: dataLocation?.city || null,
                postalCode: dataLocation?.postal || null,
                device: userAgent.isMobile ? 'Mobile' : userAgent.isTablet ? 'Tablet' : 'Desktop',
                browser: userAgent.browser || null,
                referer: req.headers.get('referer') || null,
            },
        });

        return NextResponse.json({ message: 'Click tracked successfully', profileVisitId: profileVisit.id }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 400 });
    }

}

