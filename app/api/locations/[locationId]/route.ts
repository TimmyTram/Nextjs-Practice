import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @Endpoint - GET /api/locations/{locationId}
 * @description - Fetches a single location from the database given a location id. 
 * @returns - a single location from the database.
 */
export async function GET(req: NextRequest, { params }: { params: { locationId : string }}) {
    try {
        const locationId = params.locationId;

        if(!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400});
        }
        
        const location = await prisma.location.findUnique({
            where: {
                id: locationId
            },
            include: {
                operatingHours: {
                    select: {
                        day: true,
                        openTime: true,
                        closeTime: true
                    }
                }
            }
        });

        if(!location) {
            return NextResponse.json({ error: "Location not found." }, { status: 404});
        }

        return NextResponse.json(location);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/locations/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}