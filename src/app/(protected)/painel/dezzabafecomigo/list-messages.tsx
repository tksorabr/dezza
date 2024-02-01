'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import api from '@/services/api'
import { Message } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function ListMessages({
  data,
  type,
}: {
  data: Message[]
  type: 'pending' | 'selected'
}) {
  const queryClient = useQueryClient()
  const updateMessage = useMutation({
    mutationFn: ({ id, isSelected }: { id: string; isSelected: boolean }) => {
      return api.put(`/messages/${id}`, { isSelected })
    },
    onSuccess: () => {
      toast.success('Mensagem atualizada com sucesso')
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
    onError: () => {
      toast.error('Erro ao atualizar mensagem')
    },
  })
  const deleteMessage = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data } = await api.delete(`/messages/${id}`)
      return data
    },
    onSuccess: () => {
      toast.success('Mensagem deletada com sucesso')
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
    onError: () => {
      toast.error('Erro ao deletar mensagem')
    },
  })
  return (
    <>
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader>
          <CardTitle>
            {type === 'pending'
              ? 'Mensagens pendentes'
              : 'Mensagens selecionadas'}
          </CardTitle>
          <CardDescription>
            {type === 'pending'
              ? 'Mensangens pendentes para análise.'
              : ' Mensangens selecionadas para serem lidas.'}
          </CardDescription>
        </CardHeader>
      </Card>

      {data.map((message) => (
        <Card key={message.id}>
          <CardHeader>
            <CardDescription>#{message.id}</CardDescription>
          </CardHeader>
          <CardContent>{message.text}</CardContent>
          <CardFooter className="flex justify-end gap-4">
            {type === 'pending' ? (
              <Button
                size={'lg'}
                className="bg-green-500 hover:bg-green-400"
                onClick={() =>
                  updateMessage.mutate({
                    id: message.id,
                    isSelected: true,
                  })
                }
              >
                Selecionar
              </Button>
            ) : (
              <Button
                size={'lg'}
                className="bg-amber-500 hover:bg-amber-400"
                onClick={() =>
                  updateMessage.mutate({
                    id: message.id,
                    isSelected: false,
                  })
                }
              >
                Desmarcar
              </Button>
            )}
            <Button
              variant={'ghost'}
              onClick={() =>
                deleteMessage.mutate({
                  id: message.id,
                })
              }
            >
              Excluir
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
