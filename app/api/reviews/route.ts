import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface ReviewData {
    rating: number;
    description: string;
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
                description: true,
                timestamp: true
            }
        });

        return NextResponse.json(reviews);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/reviews/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}

// // Endpoint to create a new review
// export async function POST(req: NextRequest) {
//     try {
//         const body: ReviewData = await req.json();
//         const requiredFields: (keyof ReviewData)[] = [
//             'rating',
//             'description',
//             'locationId',
//             'userId'
//         ]
    
//         const missingFields = requiredFields.filter(field => !body[field] === undefined);
    
//         if (missingFields.length > 0) {
//             return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
//         }
        
//         const location = await prisma.location.findFirst({
//             where: {
//                 id: body.locationId
//             }
//         });

//         if(!location) {
//             return NextResponse.json({ error: "Location does not exist." }, { status: 400});
//         }

//         // realistcally this would not be needed to be included, but i dont have auth setup yet
//         const user = await prisma.user.findFirst({
//             where: {
//                 id: body.userId
//             }
//         });

//         if(!user) {
//             return NextResponse.json({ error: "User does not exist." }, { status: 400});
//         }


//         const review = await prisma.review.create({
//             data: {
//                 rating: body.rating,
//                 description: body.description,
//                 locationId: body.locationId,
//                 userId: body.userId
//             }
//         });

//         return NextResponse.json(review, { status: 201 });
//     } catch (error: any) {
//         console.log(`[ERROR]: Error in POST of api/reviews/route.ts: ${error}`);
//         return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
//     }
// }