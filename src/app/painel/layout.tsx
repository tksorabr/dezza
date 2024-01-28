import AuthLayout from '@/components/layouts/auth-layout'
import { ReactNode } from 'react'

export default async function PainelLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>
}
