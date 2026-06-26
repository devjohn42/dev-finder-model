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
		async jwt({ token, session }) {
			const dbUser = await db.query.users.findFirst({
				where: (users, { eq }) => eq(users.email, token.email!)
			})

			if (!dbUser) {
				throw new Error('no user with email found')
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image
			}
		},
		async session({ token, session }) {
			if (token) {
				session.user = {
					id: token.id as string,
					name: token.name,
					email: token.email,
					image: token.picture
				}
			}

			return session
		}
	}
} satisfies AuthOptions

export function getSession() {
	return getServerSession(authConfig)
}
