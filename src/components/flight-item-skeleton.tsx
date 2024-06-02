import { Plane, Users } from 'lucide-react'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

const FlightItemSkeleton = () => {
	return (
		<div className='flex flex-col gap-2 p-4 my-2 bg-white rounded-lg shadow-md lg:flex-row lg:items-center lg:justify-between'>
			<div className='flex flex-col w-full gap-2 '>
				<div className='flex items-center justify-between w-full'>
					<div className='flex items-center gap-2 text-sm text-gray-500'>
						<Plane size={24} />
						Uçak Modeli
						<span className='font-medium text-black'>
							<Skeleton className='w-10 h-4 ' />
						</span>
					</div>
					<div className='flex items-center gap-2 text-sm text-gray-500 lg:hidden'>
						<Users size={24} />
						Uçak Kapasitesi
						<span className='font-medium text-black'>
							<Skeleton className='w-10 h-4 ' />
						</span>
					</div>
				</div>
				<div className='text-sm text-gray-500'>
					<Skeleton className='w-40 h-4 ' />
				</div>
				<div className='text-2xl font-bold'>
					<Skeleton className='h-10 w-52 ' />
				</div>
			</div>
			<div className='flex flex-col w-full gap-2'>
				<div className='flex items-center justify-between w-full'>
					<div className='flex items-center gap-2 text-sm text-gray-500 max-lg:hidden'>
						<Users size={24} />
						Uçak Kapasitesi
						<span className='font-medium text-black'>
							<Skeleton className='w-10 h-4 ' />
						</span>
					</div>
				</div>
				<div className='flex flex-col'>
					<div className='text-sm text-gray-500'>Uçuş Süresi</div>
					<div className='text-2xl font-bold'>
						<Skeleton className='w-40 h-10 ' />
					</div>
				</div>
			</div>

			<Button
				variant='primary'
				size='lg'
				disabled
			>
				Seç
			</Button>
		</div>
	)
}

export default FlightItemSkeleton
