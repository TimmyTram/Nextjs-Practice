import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
    Endpoint to get a specific location's reviews

    e.g: http://localhost:3000/api/locations/66fec74fdc05f6754387603b
*/
export async function GET(req: NextRequest, { params } : { params : { locationId : string}}) {
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
            comment: true,
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
}