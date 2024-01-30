'use client'

import api from '@/services/api'
import { Message } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function PainelPage() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await api.get('/messages')
      setMessages(data)
    }
    getMessages()
  }, [])

  if (!messages) return <>Carregando</>
  return (
    <main>
      <div className="min-h-screen flex flex-col justify-center gap-14">
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.text}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
