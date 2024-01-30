'use client'
import Image from 'next/image'
import imgLogo from '@/assets/logo.png'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import CheckBoxTerms from './components/checkbox-terms'
import api from '@/services/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function DezzabafeComigoPage() {
  const router = useRouter()
  const [isAcceptedTerms, setIsAcceptedTerms] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await api.post('/messages', {
        text: message,
      })
      router.push('/dezzabafecomigo/success')
    } catch (error) {
      toast.error('Erro ao enviar mensagem')
    }
    setLoading(false)
  }
  return (
    <div className="min-h-screen flex flex-col justify-center gap-14">
      <div className="flex flex-col items-center gap-4">
        <Image alt="logo" src={imgLogo} />
        <div className="text-center text-xl font-extralight">
          Sinta-se à vontade para expressar o que está em seu coração.
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center w-full">
        <Textarea
          className="text-primary min-h-[160px]"
          placeholder="Me envie mensagens anônimas..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <label className="font-thin text-sm">Mensagens 100% anônimas</label>
      </div>
      <div className="w-full flex flex-col justify-center gap-8">
        <CheckBoxTerms
          isChecked={isAcceptedTerms}
          onChange={(value) => setIsAcceptedTerms(value)}
        />
        <Button
          disabled={!isAcceptedTerms || isLoading || message.length < 15}
          className="w-full rounded-md px-8 h-24 text-4xl"
          onClick={() => handleSubmit()}
        >
          Desabafar!
        </Button>
      </div>
    </div>
  )
}
