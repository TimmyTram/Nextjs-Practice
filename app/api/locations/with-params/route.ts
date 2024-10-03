import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const locationId = searchParams.get("locationId");

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