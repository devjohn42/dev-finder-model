'use client'

import { LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { ModeToggle } from '@/components/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

function AccountDropDown() {
	const session = useSession()
	const isLoggedIn = !!session.data

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant={'ghost'}>
					<Avatar className="mr-2 h-7 w-7">
						<AvatarImage src={session.data?.user.image ?? ''} />
						<AvatarFallback>JV</AvatarFallback>
					</Avatar>

					{session.data?.user.name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					{isLoggedIn ? (
						<DropdownMenuItem onClick={() => signOut()}>
							<LogOut className="mr-2" /> Sign Out
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem onClick={() => signIn('google')}>
							<LogIn className="mr-2" />
							Sign In
						</DropdownMenuItem>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function Header() {
	return (
		<header className="border-b bg-background px-4 py-4">
			<div className="flex items-center justify-between">
				<Button variant={'ghost'} className="cursor-pointer">
					<Link href="/">Dev Finder Model</Link>
				</Button>
				<div className="flex items-center gap-4">
					<AccountDropDown />
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}
