import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  //const users = await prisma.user.findMany();

  // get all users except their password
  const users = await prisma.user.findMany({
    select: {
      username: true,
      email: true,
      role: true,
      timestamp: true,
    },
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { error: "username, email and password are required" },
      { status: 400 }
    );
  }

  // validate that the username and email are unique
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

  const salt = await bcrypt.genSalt(10);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: await bcrypt.hash(password, salt),
      role: "default",
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