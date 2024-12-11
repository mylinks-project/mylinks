import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {

        if (!params.userId) {
            return NextResponse.json('User Id is required', { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: params.userId
            }
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log(`USER_GET: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function PATCH(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        const userId = session?.user.id;
        const { name, username, email,bio,image } = await req.json();

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!name) {
            return NextResponse.json('Name is required', { status: 400 });
        }

        if (!username) {
            return NextResponse.json('Username Value is required', { status: 400 });
        }

        if (!email) {
            return NextResponse.json('email Value is required', { status: 400 });
        }

        if (!params.userId) {
            return NextResponse.json('User Id is required', { status: 400 });
        }

        const userByUserId = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userByUserId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        const user = await prisma.user.updateMany({
            where: {
                id: params.userId
            },
            data: {
                name,
                username,
                email,
                image,
                bio
            }
        });

        console.log(user);
        return NextResponse.json(user);

    } catch (error) {
        console.log(`USER_PATCH: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function PUT(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        const { password, newPassword } = await req.json();

        const userId = session?.user.id;

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!password) {
            return NextResponse.json('Password is required', { status: 400 });
        }

        if (!params.userId) {
            return NextResponse.json('User Id is required', { status: 400 });
        }

        const userByUserId = await prisma.user.findUnique({
            where: {
                id: params.userId,
            }
        });

        if (!userByUserId) {
            return NextResponse.json('User not found!', { status: 400 });
        }

        if (!userByUserId.password) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        const comparePassword = await bcrypt.compare(password, userByUserId.password);

        if (!comparePassword) {
            return NextResponse.json({ message: 'Incorrect Password' }, { status: 400 });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        const user = await prisma.user.updateMany({
            where: {
                id: params.userId
            },
            data: {
                password: hashPassword
            }
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log(`USER_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        const { password } = await req.json();

        const userId = session?.user.id;

        if (!userId) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        if (!password) {
            return NextResponse.json('Password is required', { status: 400 });
        }

        if (!params.userId) {
            return NextResponse.json('User Id is required', { status: 400 });
        }

        const userByUserId = await prisma.user.findUnique({
            where: {
                id: params.userId,
            }
        });

        if (!userByUserId) {
            return NextResponse.json('User not found!', { status: 400 });
        }

        if (!userByUserId.password) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        const comparePassword = await bcrypt.compare(password, userByUserId.password);

        if (!comparePassword) {
            return NextResponse.json({ message: 'Incorrect Password' }, { status: 400 });
        }

        const user = await prisma.user.deleteMany({
            where: {
                id: params.userId
            }
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log(`USER_DELETE: ${error}`);
        return NextResponse.json(error, { status: 400 });
    }
}