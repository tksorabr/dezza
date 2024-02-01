'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import api from '@/services/api'
import { Message } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import ListMessages from './list-messages'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const fetchMessages = async (filter: string) => {
  const { data } = await api.get<Message[]>('/messages', {
    params: {
      isSelected: filter === 'selected',
    },
  })
  return data
}

export default function PainelPage() {
  const [filter, setFilter] = useState<string>('pending')
  const { data, isLoading } = useQuery({
    queryKey: ['messages', filter],
    queryFn: () => fetchMessages(filter),
  })
  if (isLoading) return <>Carregando</>
  if (!data) return <>Erro ao carregar dados</>
  return (
    <main className="p-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Formulário de envio mensagens</CardTitle>
            <CardDescription>
              Compartilhe esse link para preenchimento do formulário
            </CardDescription>
          </CardHeader>
          <CardContent>{window.location.origin}</CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}`)
              }}
            >
              Copiar link
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Link de visualização de mensagens</CardTitle>
            <CardDescription>
              Copie o link e cole em uma nova aba, para apresentação
            </CardDescription>
          </CardHeader>
          <CardContent>{window.location.origin}/painel/visualizar</CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/painel/visualizar`,
                )
              }}
            >
              Copiar link
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="rounded-md bg-white border px-4 py-3">
        <Tabs
          defaultValue={'pending'}
          value={filter}
          className="min-w-full"
          onValueChange={(value) => setFilter(value)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Pendentes
            </TabsTrigger>
            <TabsTrigger
              value="selected"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Selecionadas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="flex flex-col gap-2">
            <ListMessages data={data} type="pending" />
          </TabsContent>
          <TabsContent value="selected" className="flex flex-col gap-2">
            <ListMessages data={data} type="selected" />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
