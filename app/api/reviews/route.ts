import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Endpoint to get all reviews from the database
export async function GET() {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            rating: true,
            comment: true,
            timestamp: true
        }
    });

    return NextResponse.json(reviews);
}

// Endpoint to create a new review
/*
    Expected Request Format
    {
        "rating": "Rating",
        "comment": "Comment",
        "locationId": "Location Id",
        "userId": "User Id"
    }
*/
export async function POST(req: NextRequest) {
    const { rating, comment, locationId, userId } = await req.json();

    if(!rating || !comment || !locationId || !userId) {
        return NextResponse.json({ error: "No rating, comment, locationId or userId provided." }, { status: 400});
    }

    // check if location exists
    const location = await prisma.location.findFirst({
        where: {
            id: locationId
        }
    });

    if(!location) {
        return NextResponse.json({ error: "Location does not exist." }, { status: 400});
    }

    //check if user exists
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    if(!user) {
        return NextResponse.json({ error: "User does not exist." }, { status: 400});
    }

    const review = await prisma.review.create({
        data: {
            rating,
            comment,
            locationId,
            userId
        }
    });

    return NextResponse.json(review);
}
