import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 text-white bg-gradient-to-tl from-[#3EECAC] to-[#EE74E1]">
      {children}
    </main>
  )
}
