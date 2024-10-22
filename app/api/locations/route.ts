import { NextRequest, NextResponse } from "next/server";
import { DayOfWeek, LocationType } from "@prisma/client";
import prisma from "../../../prisma/prisma";

export const fetchCache = 'default-no-store';

// defining the expected data for a location
export interface LocationData {
    name: string;
    address: string;
    phoneNumber: string;
    hasWifi: boolean;
    seatingCapacity: number;
    category: LocationType;
    rating: number;
    busynessStatus: number;
    imageWebLink: string;
    locationWebsiteLink: string;
    animalFriendliness: boolean;
    operatingHours: OperatingHour[];
}

// defining the expected data for operating hours
export interface OperatingHour {
    day: DayOfWeek;
    openTime: string;
    closeTime: string;
}

/**
 * @Endpoint - GET /api/locations
 * @description - Fetches all locations with their operating hours.
 * @returns - all locations with their operating hours.
 */
export async function GET() {
    try {
        const locations = await prisma.location.findMany({
            include: {
                operatingHours: {
                    select: {
                        day: true,
                        openTime: true,
                        closeTime: true
                    },
                    orderBy: { 
                        // Need to order the operating hours by day of the week, starting from Monday
                        // One would think we would do this by day: 'asc', but that doesn't work
                        id: 'asc'
                    }
                }
            }
        });
        return NextResponse.json(locations, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/locations/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}

/**
 * @Endpoint - POST /api/locations
 * @description - Creates a new location with the provided data.
 * @returns - the newly created location.
 */
export async function POST(req: NextRequest) {
    try {
        const body: LocationData = await req.json();
        const requiredFields: (keyof LocationData)[] = [
            'name',
            'address',
            'hasWifi',
            'category',
            'animalFriendliness',
            'operatingHours'
        ];

        const missingFields = requiredFields.filter(field => !body[field] === undefined);

        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
        }

        if(body.operatingHours.length === 0) {
            return NextResponse.json({ error: "No operating hours provided." }, { status: 400 });
        }

        const existingLocation = await prisma.location.findFirst({
            where: {
                address: body.address
            }
        });

        if (existingLocation) {
            return NextResponse.json({ error: "Location already exists." }, { status: 400 });
        }

        

        //do a transaction to create the location and its operating hours in one go
        const location = await prisma.$transaction(async (prisma) => {
            // create location
            const newLocation = await prisma.location.create({
                data: {
                    name: body.name,
                    address: body.address,
                    phoneNumber: body.phoneNumber,
                    hasWifi: body.hasWifi,
                    seatingCapacity: body.seatingCapacity,
                    category: body.category,
                    rating: body.rating,
                    busynessStatus: body.busynessStatus,
                    imageWebLink: body.imageWebLink,
                    locationWebsiteLink: body.locationWebsiteLink,
                    animalFriendliness: body.animalFriendliness
                }
            })

            for (const operatingHour of body.operatingHours) {
                await prisma.operatingHours.create({
                    data: {
                        day: operatingHour.day,
                        openTime: operatingHour.openTime,
                        closeTime: operatingHour.closeTime,
                        locationId: newLocation.id
                    }
                });
            }

            return newLocation;
        });

        return NextResponse.json(location, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/locations/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}