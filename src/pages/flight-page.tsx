import Banner from '@/components/banner/banner'
import FlightItem from '@/components/flight-item'
import FlightItemSkeleton from '@/components/flight-item-skeleton'
import FlightsHeader from '@/components/flights-header'
import { getFlights } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
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
			const data = {
				outboundFlightNumber: selectedOutboundFlight.flightNumber,
				date: params.date,
				inboundFlightNumber: selectedInboundFlight.flightNumber,
				returnDate: params.returnDate,
			}
			navigate({
				to: `/flight-details`,
				search: data,
			})
		}
		if (!isRoundTrip && selectedOutboundFlight) {
			const data = {
				outboundFlightNumber: selectedOutboundFlight.flightNumber,
				date: params.date,
			}
			navigate({
				to: `/flight-details`,
				search: data,
			})
		}
	}, [
		selectedOutboundFlight,
		selectedInboundFlight,
		params.isRoundTrip,
		params.returnDate,
		params.date,
		navigate,
	])

	const { data, error, isPending } = useQuery({
		queryKey: ['flights', params],
		queryFn: () => getFlights(params),
	})

	if (error) return <ErrorPage>{error.message}</ErrorPage>

	const handleDateChange = (newDate: Date) => {
		const { origin, destination, returnDate } = params
		const data = {
			origin,
			destination,
			date: !isRoundTrip || !selectedOutboundFlight ? newDate : params.date,
			returnDate:
				isRoundTrip && selectedOutboundFlight ? newDate : returnDate ?? '',
			isRoundTrip: isRoundTrip ? 'true' : 'false',
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

	const currentFlights =
		(!selectedOutboundFlight ? data?.outboundFlights : data?.inboundFlights) ??
		[]

	const currentFlightSetStateFunction = isRoundTrip
		? selectedOutboundFlight
			? setSelectedInboundFlight
			: setSelectedOutboundFlight
		: setSelectedOutboundFlight

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
					departureAirportCode={selectedOutboundFlight.origin.code}
					arrivalAirportCode={selectedOutboundFlight.destination.code}
					flightData={selectedOutboundFlight}
				/>
			)}
			<FlightsHeader
				departureAirportCode={currentOrigin}
				arrivalAirportCode={currentDestination}
				date={currentDate}
				minDate={selectedOutboundFlight && new Date(params.date)}
				handleDateChange={handleDateChange}
				isButtonsEnabled
			/>
			{isPending && (
				<div className='flex items-center justify-center w-full px-6 py-4'>
					<div className='flex flex-col w-full max-w-screen-sm'>
						{new Array(5).fill(0).map((_, index) => (
							<FlightItemSkeleton key={index} />
						))}
					</div>
				</div>
			)}

			{/* flight list */}
			{!isPending && currentFlights.length !== 0 && (
				<div className='flex items-center justify-center w-full px-6 py-4'>
					<div className='flex flex-col w-full max-w-screen-sm'>
						{currentFlights.map((flight) => (
							<FlightItem
								key={flight.flightNumber}
								flight={flight}
								onClickHandler={currentFlightSetStateFunction}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default FlightPage
