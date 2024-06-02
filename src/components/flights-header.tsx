import { Button } from './ui/button'
import { addDays } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDateFromString } from '@/lib/utils'

interface FlightsHeaderProps {
	departureAirportCode: string
	arrivalAirportCode: string
	flightData?: Flight
	minDate?: Date
	date?: string
	handleDateChange?: (date: Date) => void
	isButtonsEnabled?: boolean
}

const FlightsHeader = ({
	departureAirportCode,
	arrivalAirportCode,
	flightData,
	minDate,
	date,
	handleDateChange,
	isButtonsEnabled = false,
}: FlightsHeaderProps) => {
	return (
		<div className='flex items-center justify-center w-full px-6 py-4 shadow-md'>
			<div className='flex justify-between w-full max-w-screen-sm'>
				<div className='flex flex-col'>
					<div className='text-sm text-gray-500'>Kalkış</div>
					<div className='text-2xl font-bold'>{departureAirportCode}</div>
					{flightData && (
						<div className='text-sm text-gray-500'>
							{formatDateFromString(flightData.departureTime, 'hh:mm')}
							<br />
							{formatDateFromString(flightData.departureTime, 'dd/MM/yyyy')}
						</div>
					)}
				</div>
				{date && (
					<div className='flex flex-col'>
						<div className='flex items-center justify-between w-full'>
							<div className='text-sm text-gray-500'>Tarih</div>
							{isButtonsEnabled && handleDateChange && date && (
								<div className='flex items-center justify-center gap-2'>
									<Button
										variant='outline'
										size='icon'
										className='p-1 text-gray-500 h-fit w-fit '
										onClick={() =>
											handleDateChange(addDays(new Date(date), -1))
										}
										disabled={minDate && addDays(new Date(date), 1) <= minDate}
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
				{flightData && (
					<div className='flex flex-col'>
						<div className='flex items-center justify-between w-full'>
							<div className='text-sm text-gray-500'>
								Uçuş Bilgileri - {flightData.flightNumber}
							</div>
						</div>
						<div className='text-2xl font-bold'>
							{flightData.duration.hours} saat {flightData.duration.minutes} dk
						</div>
						<div className='text-sm font-bold text-gray-500'>
							{flightData.distance} km
						</div>
					</div>
				)}
				<div className='flex flex-col'>
					<div className='text-sm text-gray-500'>Varış</div>
					<div className='text-2xl font-bold'>{arrivalAirportCode}</div>
					{flightData && (
						<div className='text-sm text-gray-500'>
							{formatDateFromString(flightData.arrivalTime, 'hh:mm')}
							<br />
							{formatDateFromString(flightData.arrivalTime, 'dd/MM/yyyy')}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default FlightsHeader
