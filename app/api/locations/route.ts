import { NextRequest, NextResponse } from "next/server";
import { LocationType, PrismaClient } from "@prisma/client";

interface LocationData {
    name: string;
    address: string;
    phoneNumber: string;
    hasWifi: boolean;
    seatingCapacity: number;
    category: LocationType;
    rating: number;
    busynessStatus: number;
    imageWebLink: string;
    animalFriendliness: boolean;
}


const prisma = new PrismaClient();

// Endpoint to get all locations from the database
export async function GET() {
    try {
        const locations = await prisma.location.findMany({
            select: {
                id: true,
                name: true,
                address: true,
                phoneNumber: true,
                hasWifi: true,
                seatingCapacity: true,
                category: true,
                rating: true,
                busynessStatus: true,
                imageWebLink: true,
                animalFriendliness: true
            }
        });

        return NextResponse.json(locations);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/locations/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}

// Endpoint to create a new location
export async function POST(req: NextRequest) {
    try {
        const body: LocationData = await req.json();
        const requiredFields: (keyof LocationData)[] = [
            'name',
            'address',
            'phoneNumber',
            'hasWifi',
            'seatingCapacity',
            'category',
            'animalFriendliness',
        ];


        const missingFields = requiredFields.filter(field => !body[field] === undefined);

        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
        }

        const existingLocation = await prisma.location.findFirst({
            where: {
                address: body.address
            }
        });

        if (existingLocation) {
            return NextResponse.json({ error: "Location already exists." }, { status: 400 });
        }

        const location = await prisma.location.create({
            data: {
                name: body.name,
                address: body.address,
                phoneNumber: body.phoneNumber,
                hasWifi: body.hasWifi,
                seatingCapacity: body.seatingCapacity,
                category: body.category,
                animalFriendliness: body.animalFriendliness
            }
        });

        return NextResponse.json(location, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/locations/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}