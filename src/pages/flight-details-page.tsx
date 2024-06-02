import AddPassengersForm from '@/components/add-passenger-form'
import Banner from '@/components/banner/banner'
import FlightBookedDialog from '@/components/flight-booked-dialog'
import FlightItem from '@/components/flight-item'
import FlightItemSkeleton from '@/components/flight-item-skeleton'
import { Button } from '@/components/ui/button'
import { getFlightByFlightNumber } from '@/lib/queries'
import { formatDateFromString } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

const routeApi = getRouteApi('/flight-details')

const FlightDetailsPage = () => {
	const params: FlightDetailsPageParams = routeApi.useSearch()

	const [passengers, setPassengers] = useState<Passenger[]>([])
	const [ticketData, setTicketData] = useState<TicketData>()
	const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

	const { data, error, isPending } = useQuery({
		queryKey: ['flight', params],
		queryFn: () => getFlightByFlightNumber(params),
	})

	const toggleDetailDialog = (open: boolean) => setIsDetailDialogOpen(open)

	const handleSubmit = () => {
		if (!data || !data.outboundFlight || !passengers.length)
			return toast.error('Bir hata oluştu')

		const newTicketData: TicketData = {
			flights: data,
			passengers: passengers,
		}
		setTicketData(newTicketData)

		// toast.success('Uçuş onaylandı', {
		// 	position: 'top-right',
		// 	duration: 1000,
		// })

		setIsDetailDialogOpen(true)
	}

	return (
		<div className=''>
			<Banner height='35svh'>
				<div className='flex items-end justify-center w-full h-full max-w-screen-xl px-4 text-center text-white '>
					<h1 className='font-bold lg:text-[60px] leading-snug text-[40px] py-14'>
						Uçuş Detayları
					</h1>
				</div>
			</Banner>
			{isPending && (
				<div className='flex flex-col items-center justify-center w-full lg:flex-row'>
					<div className='flex items-center justify-center w-full px-6 py-4'>
						<div className='flex flex-col w-full max-w-screen-sm'>
							<h2 className='p-2 text-2xl font-bold'>
								Uçuş
								<span className='text-gray-700'>
									{formatDateFromString(params.date, 'dd MMMM yyyy')}
								</span>
							</h2>
							<FlightItemSkeleton />
						</div>
					</div>
				</div>
			)}
			{!isPending && error && (
				<div className='flex items-center justify-center w-full px-6 py-4'>
					bir hata oluştu
					<code>{error.message}</code>
				</div>
			)}
			{!isPending && !error && data.outboundFlight && (
				<>
					{/* flight info */}
					<div className='flex flex-col w-full justify-stretch lg:flex-row'>
						<div className='flex items-center w-full px-6 py-4 justify-strecth'>
							<div className='flex flex-col w-full max-w-screen-sm'>
								<h2 className='p-2 text-2xl font-bold'>
									{data.inboundFlight ? 'Gidiş Uçuşu' : 'Uçuş '} -{' '}
									<span className='text-gray-700'>
										{formatDateFromString(params.date, 'dd MMMM yyyy')}
									</span>
								</h2>
								<FlightItem flight={data.outboundFlight} />
							</div>
						</div>
						{data.inboundFlight && params.returnDate && (
							<div className='flex items-center justify-center w-full px-6 py-4'>
								<div className='flex flex-col w-full max-w-screen-sm'>
									<h2 className='p-2 text-2xl font-bold'>
										Dönüş Uçuşu -{' '}
										<span className='text-gray-500'>
											{formatDateFromString(params.returnDate, 'dd MMMM yyyy')}
										</span>
									</h2>
									<FlightItem flight={data.inboundFlight} />
								</div>
							</div>
						)}
					</div>
					{/* passenger info and submit */}
					<div className='flex flex-col items-start w-full gap-4 lg:flex-row justify-stretch'>
						<AddPassengersForm
							passengers={passengers}
							setPassengers={setPassengers}
						/>
						<div className='flex items-center justify-center w-full'>
							<div className='flex flex-col max-w-screen-sm gap-4 px-6 py-4'>
								<h2 className='text-2xl font-bold'>Uçuş Kuralları</h2>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Reiciendis enim maxime ducimus quidem non, repellat corrupti
									nulla blanditiis adipisci aliquam. Quam, dolores sed quod
									molestiae id cupiditate consequatur dolor reprehenderit!
								</p>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Reiciendis enim maxime ducimus quidem non, repellat corrupti
									nulla blanditiis adipisci aliquam. Quam, dolores sed quod
									molestiae id cupiditate consequatur dolor reprehenderit!
								</p>

								<Button
									variant='primary'
									size='lg'
									disabled={!passengers.length}
									onClick={handleSubmit}
								>
									Uçuşu Onayla
								</Button>
							</div>
						</div>
					</div>
					<FlightBookedDialog
						onOpenChange={toggleDetailDialog}
						open={isDetailDialogOpen}
						ticketData={ticketData}
					/>
				</>
			)}
		</div>
	)
}

export default FlightDetailsPage
