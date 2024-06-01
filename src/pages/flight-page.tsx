import Banner from '@/components/banner/banner'
import FlightsHeader from '@/components/flights-header'
import { Button } from '@/components/ui/button'
import { getFlights } from '@/lib/queries'
import { formatDateFromString } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { Plane, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const routeApi = getRouteApi('/flights')

const ErrorPage = ({ children }: { children: React.ReactNode }) => (
	<div className=''>
		<Banner height='35svh'>
			<div className='flex items-end justify-center w-full h-full max-w-screen-xl px-4 text-center text-white '>
				<h1 className='font-bold lg:text-[60px] leading-snug text-[40px] py-14'>
					En Uygun Uçak Bileti Fırsatları
				</h1>
			</div>
		</Banner>
		<div className='flex items-end justify-center w-full h-full max-w-screen-xl px-4 text-center '>
			<h1 className='font-bold lg:text-[60px] leading-snug text-[40px] py-14'>
				{children}
			</h1>
		</div>
	</div>
)

const FlightPage = () => {
	const navigate = useNavigate()
	const params: FlightPageSearchParams = routeApi.useSearch()

	const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<Flight>()
	const [selectedInboundFlight, setSelectedInboundFlight] = useState<Flight>()

	useEffect(() => {
		const isRoundTrip = params.isRoundTrip === 'true' && params.returnDate
		if (isRoundTrip && selectedOutboundFlight && selectedInboundFlight) {
			console.log({
				selectedOutboundFlight,
				selectedInboundFlight,
			})
			navigate({
				to: `/flights/${selectedOutboundFlight.flightNumber}-${selectedInboundFlight.flightNumber}`,
			})
		}
		if (!isRoundTrip && selectedOutboundFlight) {
			console.log({
				selectedOutboundFlight,
			})
			navigate({ to: `/flights/${selectedOutboundFlight.flightNumber}` })
		}
	}, [
		selectedOutboundFlight,
		selectedInboundFlight,
		params.isRoundTrip,
		params.returnDate,
		navigate,
	])
	const { data, error, isPending } = useQuery({
		queryKey: ['flights', params],
		queryFn: () => getFlights(params),
	})

	if (isPending) return <div>Loading...</div>

	if (error) return <ErrorPage>{error.message}</ErrorPage>

	if (!data) return <ErrorPage>No Data Found</ErrorPage>

	const handleDateChange = (newDate: Date) => {
		const { origin, destination, returnDate } = params
		const data = {
			origin,
			destination,
			date: newDate,
			returnDate,
		}

		navigate({ to: '/flights', search: data })
	}

	const isRoundTrip = params.isRoundTrip === 'true' && params.returnDate
	const currentOrigin = !selectedOutboundFlight
		? params.origin
		: params.destination
	const currentDestination = !selectedOutboundFlight
		? params.destination
		: params.origin
	const currentDate = !selectedOutboundFlight ? params.date : params.returnDate
	const currentFlights = !selectedOutboundFlight
		? data.outboundFlights
		: data.inboundFlights

	return (
		<div className=''>
			<Banner height='35svh'>
				<div className='flex items-end justify-center w-full h-full max-w-screen-xl px-4 text-center text-white '>
					<h1 className='font-bold lg:text-[60px] leading-snug text-[40px] py-14'>
						En Uygun Uçak Bileti Fırsatları
					</h1>
				</div>
			</Banner>
			{/* flight route header */}
			{selectedOutboundFlight && isRoundTrip && (
				<FlightsHeader
					departureAirportCode={params.origin}
					departureTime={selectedOutboundFlight.departureTime}
					arrivalAirportCode={params.destination}
					arrivalTime={selectedOutboundFlight.arrivalTime}
					flightDistance={selectedOutboundFlight.distance}
					flightDuration={`${selectedOutboundFlight.duration.hours} saat ${selectedOutboundFlight.duration.minutes} dk`}
					flightNumber={selectedOutboundFlight.flightNumber}
				/>
			)}
			<FlightsHeader
				departureAirportCode={currentOrigin}
				arrivalAirportCode={currentDestination}
				date={currentDate}
				handleDateChange={handleDateChange}
				isButtonsEnabled
			/>

			{/* flight list */}
			<div className='flex items-center justify-center w-full px-6 py-4'>
				<div className='flex flex-col w-full max-w-screen-sm'>
					{currentFlights.map((flight) => (
						<div
							key={flight.flightNumber}
							className='flex flex-col gap-2 p-4 my-2 bg-white rounded-lg shadow-md lg:flex-row lg:items-center lg:justify-between'
						>
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

							<Button
								variant='primary'
								size='lg'
								onClick={() =>
									!selectedOutboundFlight
										? setSelectedOutboundFlight(flight)
										: setSelectedInboundFlight(flight)
								}
							>
								Seç
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default FlightPage
