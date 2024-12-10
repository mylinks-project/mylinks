import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: Request) {

    try {

        const session = await auth();
        const userId = session?.user.id;

        const { title, url, platform, isVisible, order } = await req.json();
        console.log(title, url, platform, isVisible, order);


        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!title) {
            console.log("Title rot found!");
            return NextResponse.json({ error: "Title rot found!" }, { status: 400 });
        }
        if (!url) {
            console.log("Url rot found!");
            return NextResponse.json({ error: "Url rot found!" }, { status: 400 });
        }

        const isOrder = order ? order : 0;

        const createUrl = await prisma.link.create({
            data: {
                title,
                url,
                platform: platform,
                isVisible: isVisible,
                order: isOrder,
                userId: userId ,
            }
        });

        console.log(createUrl);
        return NextResponse.json(createUrl);

    } catch (error: unknown) {
        console.log("Url api Error : ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }

}


export async function PATCH(req: Request) {

    try {

        const session = await auth();
        const userId = session?.user.id;

        const { title, url, platform, isVisible, order } = await req.json();
        console.log(title, url, platform, isVisible, order);


        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!title) {
            console.log("Title rot found!");
            return NextResponse.json({ error: "Title rot found!" }, { status: 400 });
        }

        if (!url) {
            console.log("Url rot found!");
            return NextResponse.json({ error: "Url rot found!" }, { status: 400 });
        }

        const isOrder = order ? order : 0;

        const createUrl = await prisma.link.create({
            data: {
                title,
                url,
                platform: platform,
                isVisible: isVisible,
                order: isOrder,
                userId: userId,
            }
        });

        console.log(createUrl);
        return NextResponse.json(createUrl);

    } catch (error: unknown) {
        console.log("Url api Error : ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }

}

