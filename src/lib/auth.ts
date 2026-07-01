import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { AuthOptions, DefaultSession, getServerSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import { db } from '@/db'

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string
		} & DefaultSession['user']
	}
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	throw new Error('GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET must be configured.')
}

export const authConfig = {
	adapter: DrizzleAdapter(db),
	session: {
		strategy: 'jwt'
	},
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		async session({ token, session }) {
			if (session.user) {
				session.user.id = token.id as string
			}

			return session
		}
	}
} satisfies AuthOptions

export function getSession() {
	return getServerSession(authConfig)
}
