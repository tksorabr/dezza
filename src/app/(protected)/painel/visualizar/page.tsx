'use client'

import { Button } from '@/components/ui/button'

import api from '@/services/api'
import { Message } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function ListSelectedMessages() {
  const [index, setIndex] = useState<number>(0)
  const fetchMessages = async () => {
    const { data } = await api.get<Message[]>('/messages', {
      params: {
        isSelected: true,
      },
    })
    return data
  }

  const formatText = (text: string) => {
    const linhas = text.split('\n')

    return linhas.map((linha, index) => (
      <>
        <p key={index} className="indent-8 mb-4">
          {linha}
        </p>
      </>
    ))
  }

  const { data, isLoading } = useQuery({
    queryKey: ['messages', 'selected'],
    queryFn: () => fetchMessages(),
  })

  if (isLoading) return <>Carregando</>
  if (!data) return <>Erro ao carregar dados</>
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center font-medium p-6 text-base/loose leading-loose">
      <div>{formatText(data[index].text)}</div>
      <div className="flex flex-row gap-2">
        {index >= 1 && (
          <Button
            size={'lg'}
            variant={'secondary'}
            onClick={() => {
              setIndex(index - 1)
            }}
          >
            Voltar
          </Button>
        )}

        {index < data.length - 1 && (
          <Button
            size={'lg'}
            variant={'secondary'}
            onClick={() => setIndex(index + 1)}
          >
            Avançar
          </Button>
        )}
      </div>
    </div>
  )
}
