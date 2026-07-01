import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getRoom } from '@/data-access/rooms'

export default async function RoomPage({
	params
}: {
	params: Promise<{ roomId: string }>
}) {
	const { roomId } = await params

	const room = await getRoom(roomId)

	if (!room) {
		return <div>No room of this ID found</div>
	}

	const tags = room.tags!.split(',').map((tag) => tag.trim())

	return (
		<div>
			<div className="min-h-screen grid grid-cols-4">
				<div className="col-span-3 p-4">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
						VIDEO PLAYER
					</div>
				</div>

				<div className="col-span-1 p-4">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
						<h1 className="text-base">{room?.name}</h1>

						{room?.githubRepo && (
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

						<p className="texta-base text-gray-600">{room?.description}</p>
						<div className="flex gap-2 flex-wrap">
							{tags.map((tag) => (
								<Badge className="w-fit" key={tag}>
									{tag}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
