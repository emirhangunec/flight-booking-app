import Banner from '@/components/banner/banner'
import BannerSearchBar from '@/components/banner/banner-search-bar'
import HotelCard from '@/components/hotel-card'
import { Star } from 'lucide-react'

const NEARBY_HOTELS: Hotel[] = [
	{
		id: 1,
		name: 'Hotel 1',
		image: '/hotel-1.png',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
		rating: 4.5,
		price: 150,
	},
	{
		id: 2,
		name: 'Hotel 2',
		image: '/hotel-2.png',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
		rating: 4.7,
		price: 150,
	},
	{
		id: 3,
		name: 'Hotel 3',
		image: '/hotel-3.png',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
		rating: 4.9,
		price: 150,
	},
	{
		id: 4,
		name: 'Hotel 4',
		image: '/hotel-4.png',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
		rating: 3.5,
		price: 150,
	},
] as const

const IndexPage = () => {
	return (
		<div className='w-full h-full'>
			<Banner>
				<div className='flex flex-col items-center justify-center w-full h-full max-w-screen-xl gap-4 px-4 text-center text-white lg:gap-6'>
					<h1 className='font-bold lg:text-[60px] leading-snug text-[40px]'>
						Merhaba,
						<br /> nereyi keşfetmek istersiniz?
					</h1>
				</div>
				<BannerSearchBar />
			</Banner>

			<div className='flex flex-col items-center justify-center w-full h-full px-2 py-10 max-lg:gap-10'>
				<div className='flex flex-col w-full max-w-screen-xl p-2 lg:p-20'>
					<div className='flex flex-col gap-10'>
						<div className='space-y-2'>
							<h2 className='text-4xl font-bold'>
								Yakınınızdaki{' '}
								<span className='text-[#C08B7D]'>En Beğenilen</span> Oteller
							</h2>
							<p className='text-[#283841]/60'>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio
								optio eligendi repellendus vel voluptatibus.
							</p>
						</div>
					</div>
					<div className='grid items-stretch w-full grid-cols-1 gap-4 py-4 lg:grid-cols-4'>
						{NEARBY_HOTELS.map((hotel) => (
							<HotelCard
								key={hotel.id}
								hotel={hotel}
							/>
						))}
					</div>
				</div>
				<div className='flex flex-col w-full max-w-screen-xl p-2 lg:p-20'>
					<div className='flex flex-col gap-10 lg:gap-20 lg:justify-between lg:flex-row'>
						<div className='relative'>
							<div className='relative '>
								<img
									src='/image-1.png'
									alt=''
									className='object-cover w-full h-full -z-10'
								/>
								<div className='py-2.5 px-5 flex items-center justify-center gap-2.5 absolute bottom-5 left-5 bg-white rounded-full'>
									<Star
										color='#DABE28'
										fill='#DABE28'
									/>
									<span className='text-[#283841] text-xl font-bold'>4.92</span>
								</div>
							</div>
							<HotelCard
								className='absolute top-0 right-0 transform scale-50 lg:scale-75 bg-white rounded-xl -translate-x-[-20%] translate-y-[-20%] shadow-2xl '
								hotel={NEARBY_HOTELS[0]}
							/>
						</div>
						<div className='flex flex-col gap-10'>
							<div className='space-y-2'>
								<h2 className='text-4xl font-bold'>
									Neden Bizi <span className='text-[#C08B7D]'>Tercih </span>
									Etmelisiniz?
								</h2>
								<p className='text-[#283841]/60'>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio
									optio eligendi repellendus vel voluptatibus.
								</p>
							</div>
							<div className='flex flex-col gap-4 '>
								<div className='flex items-center gap-4'>
									<div className='w-4 h-4 transform rotate-45 bg-[#C08B7D]'></div>
									<h3 className='font-bold '>Kolay Kullanım</h3>
								</div>
								<div className='flex items-center gap-4'>
									<div className='w-4 h-4 transform rotate-45 bg-[#C08B7D]'></div>
									<h3 className='font-bold '>Uygun Fiyat</h3>
								</div>
								<div className='flex items-center gap-4'>
									<div className='w-4 h-4 transform rotate-45 bg-[#C08B7D]'></div>
									<h3 className='font-bold '>Hızlı ve</h3>
								</div>
								<div className='flex items-center gap-4'>
									<div className='w-4 h-4 transform rotate-45 bg-[#C08B7D]'></div>
									<h3 className='font-bold '>Kolay Kullanım</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IndexPage
