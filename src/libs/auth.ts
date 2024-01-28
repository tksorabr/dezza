import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const user = { id: '01', name: 'Dezza', password: 'Senha@01' }

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Sign in',
      credentials: {
        password: {
          label: 'Senha:',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const { password } = credentials
        if (password !== user.password) return null
        return { id: user.id, name: user.name }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        }
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export { authOptions }
