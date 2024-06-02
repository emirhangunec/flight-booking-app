import { formatDateFromString } from '@/lib/utils'
import { Plane, Users } from 'lucide-react'
import { Button } from './ui/button'

interface FlightItemProps {
	flight: Flight
	onClickHandler?: (flight: Flight) => void
}

const FlightItem = ({ flight, onClickHandler }: FlightItemProps) => {
	return (
		<div className='flex flex-col gap-2 p-4 my-2 bg-white rounded-lg shadow-md lg:flex-row lg:items-center lg:justify-between'>
			<div className='flex flex-col w-full gap-2 '>
				<div className='flex items-center justify-between w-full'>
					<div className='flex items-center gap-2 text-sm text-gray-500'>
						<Plane size={24} />
						Uçak Modeli
						<span className='font-medium text-black'>
							{flight.aircraft.model}
						</span>
					</div>
					<div className='flex items-center gap-2 text-sm text-gray-500 lg:hidden'>
						<Users size={24} />
						Uçak Kapasitesi
						<span className='font-medium text-black'>
							{flight.aircraft.passengerCapacity.total}
						</span>
					</div>
				</div>
				<div className='text-sm text-gray-500'>
					{flight.origin.city} - {flight.destination.city}
				</div>
				<div className='text-2xl font-bold'>
					{formatDateFromString(flight.departureTime, ' hh:mm')} -
					{formatDateFromString(flight.arrivalTime, ' hh:mm')}
				</div>
			</div>
			<div className='flex flex-col w-full gap-2'>
				<div className='flex items-center justify-between w-full'>
					<div className='flex items-center gap-2 text-sm text-gray-500 max-lg:hidden'>
						<Users size={24} />
						Uçak Kapasitesi
						<span className='font-medium text-black'>
							{flight.aircraft.passengerCapacity.total}
						</span>
					</div>
				</div>
				<div className='flex flex-col'>
					<div className='text-sm text-gray-500'>Uçuş Süresi</div>
					<div className='text-2xl font-bold'>
						{flight.duration.hours} saat {flight.duration.minutes} dk
					</div>
				</div>
			</div>

			{onClickHandler && (
				<Button
					variant='primary'
					size='lg'
					onClick={() => onClickHandler(flight)}
				>
					Seç
				</Button>
			)}
		</div>
	)
}

export default FlightItem
