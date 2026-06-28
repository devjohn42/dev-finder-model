import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
import { cn } from '@/lib/utils'
import { Header } from '../components/global/header'
import { Providers } from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Dev Finder Model',
	description: 'An application to help pair programming with random devs online'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn('h-full', 'antialiased', 'font-sans')}
		>
			<body className={inter.className}>
				<Providers>
					<NextTopLoader />
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	)
}
