import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface ReviewData {
    rating: number;
    comment: string;
    locationId: string;
    userId: string;
}

const prisma = new PrismaClient();

// Endpoint to get all reviews from the database
export async function GET() {
    try {
        const reviews = await prisma.review.findMany({
            select: {
                id: true,
                rating: true,
                comment: true,
                timestamp: true
            }
        });

        return NextResponse.json(reviews);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/reviews/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}

// Endpoint to create a new review

export async function POST(req: NextRequest) {
    try {
        const body: ReviewData = await req.json();
        const requiredFields: (keyof ReviewData)[] = [
            'rating',
            'comment',
            'locationId',
            'userId'
        ]
    
        const missingFields = requiredFields.filter(field => !body[field] === undefined);
    
        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
        }
        
        const location = await prisma.location.findFirst({
            where: {
                id: body.locationId
            }
        });

        if(!location) {
            return NextResponse.json({ error: "Location does not exist." }, { status: 400});
        }

        // realistcally this would not be needed to be included, but i dont have auth setup yet
        const user = await prisma.user.findFirst({
            where: {
                id: body.userId
            }
        });

        if(!user) {
            return NextResponse.json({ error: "User does not exist." }, { status: 400});
        }


        const review = await prisma.review.create({
            data: {
                rating: body.rating,
                comment: body.comment,
                locationId: body.locationId,
                userId: body.userId
            }
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/reviews/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
    
    // const { rating, comment, locationId, userId } = await req.json();

    // if(!rating || !comment || !locationId || !userId) {
    //     return NextResponse.json({ error: "No rating, comment, locationId or userId provided." }, { status: 400});
    // }

    // // check if location exists
    // const location = await prisma.location.findFirst({
    //     where: {
    //         id: locationId
    //     }
    // });

    // if(!location) {
    //     return NextResponse.json({ error: "Location does not exist." }, { status: 400});
    // }

    // //check if user exists
    // const user = await prisma.user.findFirst({
    //     where: {
    //         id: userId
    //     }
    // });

    // if(!user) {
    //     return NextResponse.json({ error: "User does not exist." }, { status: 400});
    // }

    // const review = await prisma.review.create({
    //     data: {
    //         rating,
    //         comment,
    //         locationId,
    //         userId
    //     }
    // });

    // return NextResponse.json(review);
}
