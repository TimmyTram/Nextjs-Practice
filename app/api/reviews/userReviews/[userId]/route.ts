import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// allows us to connect the database.
const prisma = new PrismaClient();