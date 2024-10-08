import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// allows us to connect the database.
const prisma = new PrismaClient();

// Endpoint to get all users from the database
export async function GET() {
  
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
}


// Endpoint to create a new user | Notice the paramter req: NextRequest is the object that contains the request information
/*
    Expected Request Format
    {
        "username": "Username",
        "email": "Email",
        "password": "Password"
    }
*/
export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();


  // to create a user we need a username, email and password
  if (!username || !email || !password) {
    return NextResponse.json(
      { error: "username, email and password are required" },
      { status: 400 }
    );
  }

  // validate that the username and email are unique, or in other words, they do not already exist in the database
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "username or email already exists" },
      { status: 400 }
    );
  }

  // hash the password before storing it in the database
  const salt = await bcrypt.genSalt(10);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: await bcrypt.hash(password, salt)
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
}