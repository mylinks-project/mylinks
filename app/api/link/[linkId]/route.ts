import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PATCH(req: Request, props: { params: Promise<{ linkId: string }> }) {
    const params = await props.params;


    try {

        const session = await auth();
        const userId = session?.user.id;

        const { title, url, platform, linkImage,isVisible, order } = await req.json();
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

        const updateLink = await prisma.link.update({
            where: {
                id: params.linkId
            },
            data: {
                title,
                url,
                platform: platform,
                isVisible: isVisible,
                order: isOrder,
                linkImage,
                userId: userId,
            }
        });


        console.log(updateLink);
        return NextResponse.json(updateLink);

    } catch (error: unknown) {
        console.log("Link api Error : ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }

}



export async function DELETE(req: Request, props: { params: Promise<{ linkId: string }> }) {
    const params = await props.params;

    try {
        const session = await auth();

        const userId = session?.user.id;

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!params.linkId) {
            return NextResponse.json('Url Id is required', { status: 400 });
        }

        const link = await prisma.link.findUnique({
            where: {
                id: params.linkId,
            }
        });

        if (!link) {
            return NextResponse.json('Link not found!', { status: 400 });
        }

        const deleteLink = await prisma.link.deleteMany({
            where: {
                id: params.linkId
            }
        });

        console.log(deleteLink);


        return NextResponse.json(deleteLink);

    } catch (error) {
        console.log(`Link_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}