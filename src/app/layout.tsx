import type { Metadata } from 'next'

import './globals.css'
import { cn } from '@/libs/utils'

import { fontSans } from '@/libs/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'twitch.tv/dezzasz',
  description: 'Live em twitch.tv/dezzasz',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-sans antialiased min-h-screen flex flex-col items-center p-4 text-white bg-gradient-to-tl from-[#3EECAC] to-[#EE74E1]',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
