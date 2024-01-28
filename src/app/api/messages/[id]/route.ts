import { authOptions } from '@/libs/auth'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface ParamsProps {
  id: string
}
export async function PUT(req: NextRequest, context: { params: ParamsProps }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 401 },
    )
  }
  const { id } = context.params
  if (!id) {
    return NextResponse.json({ message: 'Id is required' }, { status: 400 })
  }
  const data = await req.json()
  const { isSelected } = data
  if (typeof isSelected !== 'boolean') {
    return NextResponse.json(
      { message: 'isSelected is required' },
      { status: 400 },
    )
  }
  const message = await prisma.message.update({
    where: { id },
    data: { isSelected },
  })
  return NextResponse.json(message)
}

export async function DELETE(
  req: NextRequest,
  context: { params: ParamsProps },
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 401 },
    )
  }
  const { id } = context.params
  if (!id) {
    return NextResponse.json({ message: 'Id is required' }, { status: 400 })
  }
  await prisma.message.delete({
    where: { id },
  })
  return NextResponse.json({ message: 'successfully deleted' })
}
