import { cn } from '@/lib/utils'
import { MapPin, Star } from 'lucide-react'

interface HotelCardProps {
	hotel: Hotel
	className?: string
}
const HotelCard = ({ hotel, className }: HotelCardProps) => {
	return (
		<div
			className={cn(
				'flex flex-col w-full gap-5 p-4 transition-all duration-200 rounded-lg hover:bg-gray-100',
				className
			)}
		>
			<img
				src={hotel.image}
				alt={hotel.name}
				className='rounded-lg'
			/>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-1.5'>
					<div className='flex justify-between'>
						<h5 className='text-xl font-bold text-[#283841]'>{hotel.name}</h5>
						<div className='text-[#283841] flex gap-2'>
							<Star
								fill='283841'
								className='w-6 h-6 '
							/>
							<span className='font-medium'>{hotel.rating}</span>
						</div>
					</div>
					<p className='text-[#283841] font-medium opacity-50 text-sm'>
						{hotel.description}
					</p>
				</div>
				<div className='w-full h-px border-t border-dashed'></div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<span className='text-[#283841] font-bold text-xl'>
							${hotel.price.toFixed(2)}
						</span>
						<span className='text-[#283841] font-medium opacity-70 text-sm'>
							gece
						</span>
					</div>
					<div className='flex gap-2.5'>
						<MapPin
							className='w-6 h-6'
							color='#C08B7D'
						/>
						<span className='font-medium text-[#283841] text-lg'>Turkey</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HotelCard
