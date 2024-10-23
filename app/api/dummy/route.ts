import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = 'force-dynamic'

// defining the expected data from client
interface UserData {
    username: string;
    email: string;
    password: string;
    role: Role;
  }

// this dummy route should be protected.

export async function GET() {

    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        // we only want to return relevant information about the user (Note: We do not return the password. Bad Idea)
        const users = await prisma.user.findMany({
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            creationDate: true,
          },
        });
    
        return NextResponse.json(users);
        //return NextResponse.json(users, { headers: { 'Cache-Control': 'no-store' } });
      } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/dummy/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
      }
}