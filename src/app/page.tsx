import { Button } from '@/components/ui/button'
import Link from 'next/link'

// import { redirect } from 'next/navigation'
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col gap-4">
        <Link href={'https://www.twitch.tv/dezzasz'}>
          <Button size="lg" className="w-full h-24 text-xl">
            <span>
              Acessar <b>twitch.com/dezzasz</b>
            </span>
          </Button>
        </Link>
        <Link href={'/dezzabafecomigo'}>
          <Button variant={'secondary'} className="w-full h-24 text-xl">
            <span>
              Participar do <b>DEZZABAFE Comigo</b>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
