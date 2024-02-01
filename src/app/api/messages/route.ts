import { authOptions } from '@/libs/auth'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 401 },
    )
  }
  const searchParams = request.nextUrl.searchParams
  const isSelected = searchParams.get('isSelected')
  const messages = await prisma.message.findMany({
    where: {
      isSelected: isSelected === 'true',
    },
  })
  return NextResponse.json(messages)
}

export async function POST(req: Request) {
  const data = await req.json()
  const { text } = data
  if (!text) {
    return NextResponse.json({ message: 'Text empty' }, { status: 400 })
  }
  const message = await prisma.message.create({
    data: { text },
  })
  return NextResponse.json(message)
}
