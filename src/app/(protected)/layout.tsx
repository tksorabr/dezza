import { authOptions } from '@/libs/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Painel Dezzasz',
  description: 'Live em twitch.tv/dezzasz',
}

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }
  return <>{children}</>
}
