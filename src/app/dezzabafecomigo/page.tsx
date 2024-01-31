'use client'
import Image from 'next/image'
import imgLogo from '@/assets/logo.png'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import api from '@/services/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import ModalTerms from './components/modal-terms'

const formSchema = z.object({
  message: z.string().min(2, {
    message: 'A mensagem deve ter pelo menos 15 caracteres.',
  }),
  acceptedTerms: z.literal<boolean>(true, {
    errorMap: () => ({
      message: 'Você deve aceitar às condições de participação',
    }),
  }),
})

export default function DezzabafeComigoPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await api.post('/messages', {
        text: values.message,
      })
      router.push('/dezzabafecomigo/success')
    } catch (error) {
      toast.error('Erro ao enviar mensagem')
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Image alt="logo" width={200} src={imgLogo} />
        <div className="text-center text-xl font-extralight">
          Sinta-se à vontade para expressar o que está em seu coração.
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col space-y-6 text-center"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="min-h-[100px]"
                    placeholder="Me envie mensagens anônimas..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="bg-primary-foreground  rounded-sm p-2" />
                <FormDescription>Mensagens 100% anônimas</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <FormField
              control={form.control}
              name="acceptedTerms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-center" {...field}>
                      <Checkbox id="terms2" className="mr-2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Aceito as condições de participação.
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="bg-primary-foreground rounded-sm p-2" />
                </FormItem>
              )}
            />
            <ModalTerms />
          </div>
          <Button className="text-3xl h-20">Desabafar!</Button>
        </form>
      </Form>
    </div>
  )
}
