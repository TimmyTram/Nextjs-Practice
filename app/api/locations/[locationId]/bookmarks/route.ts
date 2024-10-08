import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// allows us to connect the database.
const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { locationId: string } }) {
    try {
        const locationId = params.locationId;

        const bookmarks = await prisma.bookmark.findMany({
            where: {
                locationId: locationId
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                createdAt: true
            }
        });

        if (!bookmarks || bookmarks.length === 0) {
            return NextResponse.json({ error: 'No bookmarks found for this location.' }, { status: 200 });
        }

        return NextResponse.json(bookmarks);
    } catch (error : any) {
        console.log(`[ERROR]: Error in GET of api/users/[locationId]/bookmarks/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}