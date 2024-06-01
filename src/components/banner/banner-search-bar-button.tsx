import { LucideIcon } from 'lucide-react'
import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SearchBarButtonProps extends HTMLAttributes<HTMLButtonElement> {
	icon: LucideIcon
	children: ReactNode
	active?: boolean
}
const SearchBarButton = ({
	icon: Icon,
	children,
	active = false,
}: SearchBarButtonProps) => {
	return (
		<button
			className={cn(
				'lg:py-3 lg:px-8 py-2 px-4 lg:gap-4 gap-2 flex items-center justify-center rounded-3xl transition-all duration-150 hover:bg-gray-100 font-bold max-sm:text-sm',
				active && 'bg-[#C08B7D] hover:bg-[#C08B7D] text-white'
			)}
		>
			<Icon className='lg:h-9 lg:w-9 max-sm:hidden' />
			{children}
		</button>
	)
}

export default SearchBarButton
