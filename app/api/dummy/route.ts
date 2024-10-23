import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions"; // Adjust path accordingly

export const dynamic = 'force-dynamic';

interface UserData {
    username: string;
    email: string;
    password: string;
    role: Role;
}

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                creationDate: true,
            },
        });

        return NextResponse.json(users);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/dummy/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}
