import { CreateRoomForm } from './create-room-form'

export default function CreateRoom() {
	return (
		<div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
			<div className="text-4xl font-bold">Create Room</div>
			<CreateRoomForm />
		</div>
	)
}
