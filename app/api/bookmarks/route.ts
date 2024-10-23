import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export const dynamic = 'force-dynamic';


/**
 * @Endpoint - GET /api/bookmarks
 * @description - Fetches all bookmarks from the database.
 * @returns - all bookmarks in the database.
 */
export async function GET(request: NextRequest) {
    try {

        // const { searchParams } = new URL(request.url);
        // const locationId = searchParams.get('locationId');
        // const userId = searchParams.get('userId');

        // const whereCondition: any = {};

        // if (locationId) {
        //     whereCondition.locationId = locationId;
        // }

        // if (userId) {
        //     whereCondition.userId = userId;
        // }

        const bookmarks = await prisma.bookmark.findMany({
            //where: whereCondition,
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                creationDate: true
            }
        });

        if (!bookmarks || bookmarks.length === 0) {
            return NextResponse.json({ error: 'No bookmarks found.' }, { status: 200 });
        }

        return NextResponse.json(bookmarks);
        //return NextResponse.json(bookmarks, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/bookmarks/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}