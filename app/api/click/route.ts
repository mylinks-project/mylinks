import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { profileVisitId, linkId } = await req.json();

        const profileVisit = await prisma.profileVisit.findUnique({
            where: {
                id: profileVisitId,
            },
        });

        if (!profileVisit) {
            console.log("Visit Id rot found!");
            return NextResponse.json({ error: "Original rot found!" }, { status: 400 });
        }

        await prisma.click.create({
            data: {
                visitId: profileVisit.id,
                linkId: linkId,
                userId: profileVisit.userId,
            },
        });

        return NextResponse.json({ message: 'Click tracked successfully', profile: profileVisit.id }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 400 });
    }

}

