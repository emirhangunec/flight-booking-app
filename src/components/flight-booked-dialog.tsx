import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { formatDateFromString } from '@/lib/utils'

interface FlightBookedDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	ticketData: TicketData | undefined
}

export default function FlightBookedDialog({
	open,
	onOpenChange,
	ticketData,
}: FlightBookedDialogProps) {
	if (!ticketData) return null
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogTrigger
				className='hidden'
				asChild
			>
				<Button variant='outline'>Book Flight</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-[#C08B7D]'>
						Uçuş Rezarvasyonu Tamamlandı!
					</DialogTitle>
					<DialogDescription>
						Uçuş rezervasyonunuz başarıyla tamamlandı. Detaylar aşağıda yer
						almaktadır.
					</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col w-full'>
						<div className='flex justify-between w-full'>
							<div className='flex gap-1'>
								<span className='text-gray-400'>Uçuş no:</span>
								<span className='text-gray-700'>
									{ticketData.flights.outboundFlight.flightNumber}
								</span>
							</div>
							<div className='flex gap-1'>
								<span className='text-gray-400'>Uçuş Süresi:</span>
								<span className='text-gray-700'>
									{!!ticketData.flights.outboundFlight.duration.hours && (
										<span>
											{ticketData.flights.outboundFlight.duration.hours} saat
										</span>
									)}
									{ticketData.flights.outboundFlight.duration.minutes} dakika
								</span>
							</div>
						</div>
						<div className='flex justify-between w-full'>
							<div className='flex gap-1'>
								<span className='text-2xl font-bold '>
									{ticketData.flights.outboundFlight.origin.code}
								</span>
							</div>
							<div className='flex gap-1'>
								<span className='text-2xl font-bold '>
									{ticketData.flights.outboundFlight.destination.code}
								</span>
							</div>
						</div>
						<div className='flex justify-between w-full'>
							<div className='flex gap-1'>
								<span className='text-gray-700'>
									{formatDateFromString(
										ticketData.flights.outboundFlight.departureTime,
										'HH:mm'
									)}
								</span>
								<span className='text-gray-400'>
									{formatDateFromString(
										ticketData.flights.outboundFlight.departureTime,
										'dd.MM.yyyy'
									)}
								</span>
							</div>
							<div className='flex gap-1'>
								<span className='text-gray-400'>
									{formatDateFromString(
										ticketData.flights.outboundFlight.arrivalTime,
										'dd.MM.yyyy'
									)}
								</span>
								<span className='text-gray-700'>
									{formatDateFromString(
										ticketData.flights.outboundFlight.arrivalTime,
										'HH:mm'
									)}
								</span>
							</div>
						</div>
					</div>
					{/* If there is a return flight */}
					{ticketData.flights.inboundFlight && (
						<>
							<hr />
							<div className='flex flex-col w-full'>
								<div className='flex justify-between w-full'>
									<div className='flex gap-1'>
										<span className='text-gray-400'>Uçuş no:</span>
										<span className='text-gray-700'>
											{ticketData.flights.inboundFlight.flightNumber}
										</span>
									</div>
									<div className='flex gap-1'>
										<span className='text-gray-400'>Uçuş Süresi:</span>
										<span className='text-gray-700'>
											{!!ticketData.flights.inboundFlight.duration.hours && (
												<span>
													{ticketData.flights.inboundFlight.duration.hours} saat
												</span>
											)}
											{ticketData.flights.inboundFlight.duration.minutes} dakika
										</span>
									</div>
								</div>
								<div className='flex justify-between w-full'>
									<div className='flex gap-1'>
										<span className='text-2xl font-bold '>
											{ticketData.flights.inboundFlight.origin.code}
										</span>
									</div>
									<div className='flex gap-1'>
										<span className='text-2xl font-bold '>
											{ticketData.flights.inboundFlight.destination.code}
										</span>
									</div>
								</div>
								<div className='flex justify-between w-full'>
									<div className='flex gap-1'>
										<span className='text-gray-700'>
											{formatDateFromString(
												ticketData.flights.inboundFlight.departureTime,
												'HH:mm'
											)}
										</span>
										<span className='text-gray-400'>
											{formatDateFromString(
												ticketData.flights.inboundFlight.departureTime,
												'dd.MM.yyyy'
											)}
										</span>
									</div>
									<div className='flex gap-1'>
										<span className='text-gray-400'>
											{formatDateFromString(
												ticketData.flights.inboundFlight.arrivalTime,
												'dd.MM.yyyy'
											)}
										</span>
										<span className='text-gray-700'>
											{formatDateFromString(
												ticketData.flights.inboundFlight.arrivalTime,
												'HH:mm'
											)}
										</span>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							variant='primary'
							type='submit'
						>
							Tamam
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
