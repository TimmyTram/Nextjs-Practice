import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
    Endpoint to get a specific location's reviews

    e.g: http://localhost:3000/api/locations/{locationId}
*/
export async function GET(req: NextRequest, { params } : { params : { locationId : string}}) {
    try {
        const locationId = params.locationId;
    
        if(!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400});
        }
    
        // get all reviews and their information for a location and include the name of the user who created the review
        const reviews = await prisma.review.findMany({
            where: {
                locationId: locationId
            },
            select: {
                id: true,
                rating: true,
                description: true,
                timestamp: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });
    
        if(!reviews) {
            return NextResponse.json({ error: "No reviews found." }, { status: 404});
        }
    
        return NextResponse.json(reviews);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/locations/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
    
}