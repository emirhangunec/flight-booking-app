import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { X } from 'lucide-react'

interface AddPassengerFormProps {
	passengers: Passenger[]
	setPassengers: Dispatch<SetStateAction<Passenger[]>>
}
const AddPassengersForm = ({
	passengers,
	setPassengers,
}: AddPassengerFormProps) => {
	const [lastName, setLastName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [tckn, setTckn] = useState('')

	const generateId = () => Math.random().toString(36).slice(2)
	const canSubmit = !!lastName && !!firstName && !!tckn

	const handleRemovePassenger = (id: string) => {
		setPassengers((_passengers) => _passengers.filter((p) => p.id !== id))
	}

	const handleAddPassenger = () => {
		const newPassenger = {
			firstName,
			lastName,
			tckn,
			id: generateId(),
		}
		setPassengers((_passengers) => [..._passengers, newPassenger])
		setFirstName('')
		setLastName('')
		setTckn('')
	}

	return (
		<div className='flex items-center justify-center w-full'>
			<div className='flex flex-col max-w-screen-sm gap-4 px-6 py-4'>
				<h2 className='text-2xl font-bold'>Yolcu Bilgileri</h2>
				{passengers.map((passenger, index) => (
					<div
						key={passenger.id}
						className='flex flex-col gap-1'
					>
						<h2 className='text-lg font-medium'>Yolcu {index + 1}</h2>
						<hr className='my-2' />
						<div className='flex flex-col gap-4 lg:flex-row '>
							<div className='flex items-center gap-2 justify-stretch'>
								<div className='flex flex-col w-full gap-1'>
									<Label htmlFor='firstName'>Ad</Label>
									<Input
										value={passenger.firstName}
										// onChange={(e) => setFirstName(e.target.value)}
										disabled
										id='firstName'
									/>
								</div>
								<div className='flex flex-col w-full gap-1'>
									<Label htmlFor='lastName'>Soyad</Label>
									<Input
										value={passenger.lastName}
										// onChange={(e) => setLastName(e.target.value)}
										disabled
										id='lastName'
									/>
								</div>
							</div>
							<div className='flex items-center h-full gap-2 justify-stretch '>
								<div className='flex flex-col w-full gap-1'>
									<Label htmlFor='tckn'>Kimlik Numarası</Label>
									<Input
										type='number'
										value={passenger.tckn}
										// onChange={(e) => setTckn(e.target.value)}
										disabled
										id='tckn'
									/>
								</div>
								<div className='flex items-end self-end justify-end h-full gap-1'>
									<Button
										variant='destructive'
										size='icon'
										onClick={() => handleRemovePassenger(passenger.id)}
									>
										<X />
									</Button>
								</div>
							</div>
						</div>
						<hr className='my-2' />
					</div>
				))}
				<div className='flex flex-col gap-4 lg:flex-row '>
					<div className='flex items-center gap-2 justify-stretch'>
						<div className='flex flex-col w-full gap-1'>
							<Label htmlFor='firstName'>Ad</Label>
							<Input
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								id='firstName'
							/>
						</div>
						<div className='flex flex-col w-full gap-1'>
							<Label htmlFor='lastName'>Soyad</Label>
							<Input
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								id='lastName'
							/>
						</div>
					</div>
					<div className='flex items-center h-full gap-2 justify-stretch '>
						<div className='flex flex-col w-full gap-1'>
							<Label htmlFor='tckn'>Kimlik Numarası</Label>
							<Input
								type='number'
								value={tckn}
								onChange={(e) => setTckn(e.target.value)}
								id='tckn'
							/>
						</div>
						<div className='flex items-end self-end justify-end h-full gap-1'>
							<Button
								disabled={!canSubmit}
								onClick={handleAddPassenger}
							>
								Ekle
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddPassengersForm
