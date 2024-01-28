'use client'
import Image from 'next/image'
import imgLogo from '@/assets/logo.png'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import CheckBoxTerms from './components/checkbox-terms'
export default function DezzabafeComigo() {
  const [isAcceptedTerms, setIsAcceptedTerms] = useState(false)
  const [message, setMessage] = useState('')
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
      {message}
      <div className="w-full flex flex-col justify-center gap-8">
        <CheckBoxTerms
          isChecked={isAcceptedTerms}
          onChange={(value) => setIsAcceptedTerms(value)}
        />
        <Button
          disabled={!isAcceptedTerms}
          className="w-full rounded-md px-8 h-24 text-4xl"
        >
          Desabafar!
        </Button>
      </div>
    </div>
  )
}
