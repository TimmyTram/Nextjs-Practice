import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Endpoint to get all locations from the database
export async function GET() {
    const locations = await prisma.location.findMany({
        select: {
            id: true,
            name: true,
            address: true
        }
    });

    return NextResponse.json(locations);
}

// Endpoint to create a new location
/*
    Expected Request Format
    {
        "name": "Location Name",
        "address": "Location Address"
    }
*/
export async function POST(req: NextRequest) {
    const { name, address } = await req.json(); 

    if(!name || !address) {
        return NextResponse.json({ error: "No name or address provided." }, { status: 400});
    }

    // check if address is already used?
    const existingLocation = await prisma.location.findFirst({
        where: {
            address
        }
    });

    if(existingLocation) {
        return NextResponse.json({ error: "Location already exists." }, { status: 400});
    }

    const location = await prisma.location.create({
        data: {
            name,
            address
        }
    });

    return NextResponse.json(location);
}