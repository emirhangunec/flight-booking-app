import AddPassengersForm from '@/components/add-passenger-form'
import Banner from '@/components/banner/banner'
import FlightItem from '@/components/flight-item'
import FlightItemSkeleton from '@/components/flight-item-skeleton'
import { getFlightByFlightNumber } from '@/lib/queries'
import { formatDateFromString } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'

const routeApi = getRouteApi('/flight-details')

const FlightDetailsPage = () => {
	const params: FlightDetailsPageParams = routeApi.useSearch()

	const [passengers, setPassengers] = useState<Passenger[]>([])

	const { data, error, isPending } = useQuery({
		queryKey: ['flight', params],
		queryFn: () => getFlightByFlightNumber(params),
	})

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
					<div className='flex flex-col items-center justify-center w-full lg:flex-row'>
						<div className='flex items-center justify-center w-full px-6 py-4'>
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
					<AddPassengersForm
						passengers={passengers}
						setPassengers={setPassengers}
					/>
				</>
			)}
		</div>
	)
}

export default FlightDetailsPage
