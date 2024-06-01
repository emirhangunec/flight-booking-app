import { Button } from './ui/button'
import { addDays } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDateFromString } from '@/lib/utils'

interface FlightsHeaderProps {
	departureAirportCode: string
	arrivalAirportCode: string
	departureTime?: string
	arrivalTime?: string
	date?: string
	flightDuration?: string
	flightDistance?: number
	flightNumber?: string
	handleDateChange?: (date: Date) => void
	isButtonsEnabled?: boolean
}

const FlightsHeader = ({
	departureAirportCode,
	arrivalAirportCode,
	departureTime,
	arrivalTime,
	date,
	flightDuration,
	flightDistance,
	flightNumber,
	handleDateChange,
	isButtonsEnabled = false,
}: FlightsHeaderProps) => {
	return (
		<div className='flex items-center justify-center w-full px-6 py-4 shadow-md'>
			<div className='flex justify-between w-full max-w-screen-sm'>
				<div className='flex flex-col'>
					<div className='text-sm text-gray-500'>Kalkış</div>
					<div className='text-2xl font-bold'>{departureAirportCode}</div>
					{departureTime && (
						<div className='text-sm text-gray-500'>
							{formatDateFromString(departureTime, 'hh:mm')}
						</div>
					)}
				</div>
				{date && (
					<div className='flex flex-col'>
						<div className='flex items-center justify-between w-full'>
							<div className='text-sm text-gray-500'>Tarih</div>
							{isButtonsEnabled && handleDateChange && (
								<div className='flex items-center justify-center gap-2'>
									<Button
										variant='outline'
										size='icon'
										className='p-1 text-gray-500 h-fit w-fit '
										onClick={() =>
											handleDateChange(addDays(new Date(date), -1))
										}
									>
										<ChevronLeft size={14} />
									</Button>
									<Button
										variant='outline'
										size='icon'
										className='p-1 text-gray-500 h-fit w-fit '
										onClick={() => handleDateChange(addDays(new Date(date), 1))}
									>
										<ChevronRight size={14} />
									</Button>
								</div>
							)}
						</div>

						<div className='text-2xl font-bold'>
							{formatDateFromString(date, 'PPP')}
						</div>
					</div>
				)}
				{flightDistance && flightDuration && flightNumber && (
					<div className='flex flex-col'>
						<div className='flex items-center justify-between w-full'>
							<div className='text-sm text-gray-500'>
								Uçuş Bilgileri - {flightNumber}
							</div>
						</div>
						<div className='text-2xl font-bold'>{flightDuration}</div>
						<div className='text-sm font-bold text-gray-500'>
							{flightDistance} km
						</div>
					</div>
				)}
				<div className='flex flex-col'>
					<div className='text-sm text-gray-500'>Varış</div>
					<div className='text-2xl font-bold'>{arrivalAirportCode}</div>
					{arrivalTime && (
						<div className='text-sm text-gray-500'>
							{formatDateFromString(arrivalTime, 'hh:mm')}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default FlightsHeader
