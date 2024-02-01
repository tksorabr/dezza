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

export default function DezzaBafeComigoPage() {
  const [filter, setFilter] = useState<string>('pending')
  const { data, isLoading } = useQuery({
    queryKey: ['messages', filter],
    queryFn: () => fetchMessages(filter),
  })
  if (isLoading) return <>Carregando</>
  if (!data) return <>Erro ao carregar dados</>
  return (
    <main className="container p-4 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Link de visualização de mensagens</CardTitle>
          <CardDescription>
            Copie o link e cole no OBS, para apresentar a sequência de mensagens
            selecionadas
            <br />
            <b>Obs.: Não compartilhe esse link</b>
          </CardDescription>
        </CardHeader>
        <CardContent>{window.location.origin}/dezzabafecomigo/7bk9</CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/dezzabafecomigo/7bk9`,
              )
            }}
          >
            Copiar link
          </Button>
        </CardFooter>
      </Card>

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
