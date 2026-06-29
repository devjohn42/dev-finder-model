import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { getRooms } from '@/data-access/rooms'
import { Room } from '@/db/schema'

function RoomCard({ room }: { room: Room }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{room.name}</CardTitle>
				<CardDescription>{room.description}</CardDescription>
			</CardHeader>
			<CardContent>
				{room.githubRepo && (
					<Link
						href={room.githubRepo}
						className="flex items-center gap-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkIcon width={16} height={16} />
						Github Project
					</Link>
				)}
			</CardContent>
			<CardFooter>
				<Button>
					<Link href={`/rooms/${room.id}`}>Join Room</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

export default async function Home() {
	const rooms = await getRooms()

	return (
		<main className="min-h-screen p-16">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-4xl">Find Dev Rooms</h1>
				<Button variant={'default'} className="cursor-pointer">
					<Link href="/create-room">Create Room</Link>
				</Button>
			</div>

			<div className="grid grid-cols-4 gap-4">
				{rooms.map((room) => {
					return <RoomCard key={room.id} room={room} />
				})}
			</div>
		</main>
	)
}
