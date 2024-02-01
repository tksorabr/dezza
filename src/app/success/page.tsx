import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

import Link from 'next/link'

// import { redirect } from 'next/navigation'
export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-4 mb-6 text-green-500">
        <CheckCircle size={44} />
        <h1 className="text-xl font-semibold">Mensagem enviada com sucesso!</h1>
      </div>

      <Link href={'/'}>
        <Button variant={'link'} size="sm">
          Voltar
        </Button>
      </Link>
    </div>
  )
}
