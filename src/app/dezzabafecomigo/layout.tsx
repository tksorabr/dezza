import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const metadata = {
  title: 'DezzaBafe Comigo',
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>
}
