import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@radix-ui/react-icons'

import Link from 'next/link'

// import { redirect } from 'next/navigation'
export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <Alert>
        <CheckIcon className="h-4 w-4" />
        <AlertTitle>Mensagem enviada com sucesso!</AlertTitle>
      </Alert>

      <Link href={'/dezzabafecomigo'}>
        <Button variant={'link'} size="sm">
          Voltar
        </Button>
      </Link>
    </div>
  )
}
