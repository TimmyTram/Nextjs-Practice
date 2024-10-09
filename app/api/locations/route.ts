import { NextRequest, NextResponse } from "next/server";
import { DayOfWeek, LocationType, PrismaClient } from "@prisma/client";

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
    animalFriendliness: boolean;
    operatingHours: OperatingHour[];
}

// defining the expected data for operating hours
export interface OperatingHour {
    day: DayOfWeek;
    timeSlots: TimeSlot[];
}

// defining the expected data for a time slot
export interface TimeSlot {
    startTime: string;
    endTime: string;
}


const prisma = new PrismaClient();

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
                        timeSlots: {
                            select: {
                                startTime: true,
                                endTime: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(locations);
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
            'phoneNumber',
            'hasWifi',
            'seatingCapacity',
            'category',
            'animalFriendliness',
            'operatingHours'
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

        // do a transaction to create the location and its operating hours in one go
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
                    animalFriendliness: body.animalFriendliness
                }
            })

            // create operating hours
            for(const operatingHour of body.operatingHours) {
                const createdOperatingHour = await prisma.operatingHours.create({
                    data: {
                        day: operatingHour.day,
                        locationId: newLocation.id,
                        timeSlots: {
                            create: operatingHour.timeSlots.map((slot: TimeSlot) => ({
                                startTime: slot.startTime,
                                endTime: slot.endTime
                            }))
                        }
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