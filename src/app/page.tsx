import { Button } from '@/components/ui/button'
import Link from 'next/link'

// import { redirect } from 'next/navigation'
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center gap-4">
      <Link href={'/dezzabafecomigo'}>
        <Button size="lg" className="w-full">
          <span>
            Acessar <b>twitch.com/dezzasz</b>
          </span>
        </Button>
      </Link>
      <Link href={'/dezzabafecomigo'}>
        <Button variant={'secondary'} size="lg" className="w-full">
          <span>
            Participar do <b>DezzaBafe Comigo</b>
          </span>
        </Button>
      </Link>
    </div>
  )
}
