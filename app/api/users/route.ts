import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
  }

  const newUser = await prisma.user.create({
    data: { name, email, password },
  })

  return NextResponse.json(newUser, { status: 201 })
}