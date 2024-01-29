import type { Metadata } from 'next'

import './globals.css'
import { cn } from '@/libs/utils'
import DefaultLayout from '@/components/layouts/default-layout'
import AuthProvider from '@/contexts/AuthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '../libs/auth'
import { fontSans } from '@/libs/fonts'

export const metadata: Metadata = {
  title: 'twitch.tv/dezzasz',
  description: 'Live em twitch.tv/dezzasz',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <AuthProvider session={session}>
          <DefaultLayout>{children}</DefaultLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
