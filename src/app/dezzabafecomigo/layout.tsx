import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const metadata = {
  title: 'DezzaBafe Comigo',
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen">
      {children}
    </div>
  )
}
