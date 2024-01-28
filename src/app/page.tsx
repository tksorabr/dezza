import { getServerSession } from 'next-auth'
import { authOptions } from '../libs/auth'

// import { redirect } from 'next/navigation'
export default async function Home() {
  // redirect('https://www.twitch.tv/dezzasz')
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <>not logged</>
  }

  return <>{session.user.name}</>
}
