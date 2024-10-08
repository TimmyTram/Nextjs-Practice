import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

interface UserData {
  username: string;
  email: string;
  password: string;
  role: Role;
}

// allows us to connect the database.
const prisma = new PrismaClient();

// Endpoint to get all users from the database
export async function GET() {
  try {
    // we only want to return relevant information about the user (Note: We do not return the password. Bad Idea)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        timestamp: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.log(`[ERROR]: Error in GET of api/users/route.ts: ${error}`);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}


// Endpoint to create a new user | Notice the paramter req: NextRequest is the object that contains the request information
export async function POST(req: NextRequest) {
  try {
    const body: UserData = await req.json();
    const requiredFields: (keyof UserData)[] = [
      'username',
      'email',
      'password'
    ];

    const missingFields = requiredFields.filter(field => !body[field] === undefined);

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "username or email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: await bcrypt.hash(body.password, salt),
      },
    });

    return NextResponse.json(
      {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.timestamp,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(`[ERROR]: Error in POST of api/users/route.ts: ${error}`);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}