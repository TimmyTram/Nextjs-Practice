import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// allows us to connect the database.
const prisma = new PrismaClient();

/**
 * Fetches all bookmarks from the database along with the user who created the bookmark.
 * Endpoint - GET /api/bookmarks
 */
export async function GET() {
    try {
        const bookmarks = await prisma.bookmark.findMany({
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
            return NextResponse.json({ error: 'No bookmarks found.' }, { status: 200 });
        }

        return NextResponse.json(bookmarks);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/bookmarks/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}