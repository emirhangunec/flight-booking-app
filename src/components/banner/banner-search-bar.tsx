import {
	BedSingle,
	CalendarDays,
	ChevronRight,
	Plane,
	PlaneLanding,
	PlaneTakeoff,
	XCircle,
} from 'lucide-react'
import SearchBarButton from './banner-search-bar-button'
import { ComboboxWithSearch } from '../combobox-with-search'
import { useQuery } from '@tanstack/react-query'
import { getAirports } from '@/lib/queries'
import { useState } from 'react'
import DatePicker from '../date-picker'
import ButtonGroup from '../button-group'
import AnimatedButton from '../animated-button'
import {
	excludeAirport,
	mapAirportsToComboboxItems,
} from '@/lib/banner-search-bar-helpers'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

const BannerSearchBar = () => {
	const navigate = useNavigate()

	const [destination, setDestination] = useState('')
	const [origin, setOrigin] = useState('')
	const [date, setDate] = useState<Date | undefined>(undefined)
	const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
	const [isRoundTrip, setIsRoundTrip] = useState(true)

	const handleSubmit = () => {
		if (!date || !origin || !destination || (isRoundTrip && !returnDate)) {
			return toast.error('Lütfen tüm alanları doldurunuz.', {
				icon: <XCircle color='red' />,
				action: {
					label: 'X',
					onClick: () => toast.dismiss(),
				},
				position: 'top-right',
			})
		}
		const data = {
			origin,
			destination,
			date,
			returnDate: returnDate ?? '',
			isRoundTrip: isRoundTrip ? 'true' : 'false',
		}

		navigate({ to: '/flights', search: data })
	}

	const { data, error, isPending } = useQuery({
		queryKey: ['airports', 'all'],
		queryFn: getAirports,
	})

	if (isPending) return <div>Loading...</div>

	if (error) return <div>Error: {error.message}</div>

	const tripOptionButtons = [
		{
			label: 'Tek Yön',
			onClick: () => setIsRoundTrip(false),
			active: false,
		},
		{
			label: 'Gidiş Dönüş',
			onClick: () => setIsRoundTrip(true),
			active: true,
		},
	]

	const departureAirports = excludeAirport(data, destination)
	const destinationAirports = excludeAirport(data, origin)

	const departureAirportItems = mapAirportsToComboboxItems(departureAirports)
	const destinationAirportItems =
		mapAirportsToComboboxItems(destinationAirports)

	return (
		<div className='w-full max-w-screen-2xl lg:p-20'>
			<div className='relative'>
				<div className='absolute top-0 left-0 flex flex-col items-center justify-center gap-2 -translate-y-full bg-white max-lg:w-full rounded-t-3xl'>
					{/* hotel || flight */}
					<div className='flex items-center justify-center w-full gap-2 p-3 lg:pb-3 max-lg:border-b lg:p-7'>
						<SearchBarButton icon={BedSingle}>
							Otel Rezarvasyonu
						</SearchBarButton>
						<SearchBarButton
							icon={Plane}
							active
						>
							Uçak Bileti
						</SearchBarButton>
					</div>
					<ButtonGroup buttons={tripOptionButtons} />
				</div>
				<div className='flex w-full gap-4 p-4 bg-white lg:rounded-3xl lg:rounded-tl-none lg:p-7 max-sm:px-0 max-sm:pb-0 max-xl:flex-col'>
					<div className='flex items-center gap-4 max-sm:flex-col justify-evenly'>
						<div className='flex flex-col w-full gap-2 lg:gap-4 max-lg:px-10'>
							<div className='flex items-center gap-1 font-medium lg:gap-2'>
								<PlaneTakeoff className='w-6 h-6' />
								Kalkış Havalimanı
							</div>
							<ComboboxWithSearch
								items={departureAirportItems}
								text='Havaalanı'
								value={origin}
								setValue={setOrigin}
							/>
						</div>
						<div className='flex flex-col w-full gap-2 lg:gap-4 max-lg:px-10'>
							<div className='flex items-center gap-1 font-medium lg:gap-2'>
								<PlaneLanding className='w-6 h-6' />
								Varış Havalimanı
							</div>
							<ComboboxWithSearch
								items={destinationAirportItems}
								text='Havaalanı'
								value={destination}
								setValue={setDestination}
							/>
						</div>
					</div>
					<div className='flex items-center gap-4 max-sm:flex-col justify-evenly'>
						<div className='flex flex-col w-full gap-2 lg:gap-4 max-lg:px-10'>
							<div className='flex items-center gap-1 font-medium lg:gap-2'>
								<CalendarDays className='w-6 h-6' />
								{isRoundTrip ? 'Gidiş Tarihi' : 'Tarih'}
							</div>
							<DatePicker
								value={date}
								onChange={(date) => setDate(date)}
								disabledDates={{
									before: new Date(),
								}}
								text='Bir Tarih Seçiniz'
							/>
						</div>
						{isRoundTrip && (
							<div className='flex flex-col w-full gap-2 lg:gap-4 max-lg:px-10'>
								<div className='flex items-center gap-1 font-medium lg:gap-2'>
									<CalendarDays className='w-6 h-6' />
									Dönüş Tarihi
								</div>
								<DatePicker
									value={returnDate}
									onChange={(date) => setReturnDate(date)}
									disabledDates={{
										before: date || new Date(),
									}}
									text='Bir Tarih Seçiniz'
								/>
							</div>
						)}
					</div>
					<div className='flex items-center justify-end w-full gap-4 max-sm:flex-col'>
						<AnimatedButton
							className='h-full  lg:!rounded-3xl max-sm:!rounded-none max-sm:w-full'
							onClick={handleSubmit}
						>
							<span className='flex items-center justify-center w-full gap-2'>
								Uçak Bileti Ara <ChevronRight className='w-6 h-6' />
							</span>
						</AnimatedButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BannerSearchBar
