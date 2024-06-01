import { cn } from '@/lib/utils'
import { HTMLAttributes, useState } from 'react'
import { Button } from './ui/button'

interface ButtonProps {
	label: string
	active?: boolean
	onClick: () => void
}

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
	buttons: ButtonProps[]
}

const ButtonGroup = ({ buttons, className, ...props }: ButtonGroupProps) => {
	const initialActiveButtonIndex =
		buttons.findIndex((button) => button.active) !== -1
			? buttons.findIndex((button) => button.active)
			: 0
	const [activeButtonIndex, setActiveButtonIndex] = useState(
		initialActiveButtonIndex
	)

	return (
		<div
			className={cn(
				'flex items-center justify-center  w-full  p-3  lg:pb-0',
				className
			)}
			{...props}
		>
			{buttons.map((button, index) => {
				const isActive = activeButtonIndex === index
				const isFirstElement = index === 0
				const isLastElement = index === buttons.length - 1

				return (
					<Button
						key={button.label}
						onClick={() => {
							setActiveButtonIndex(index)
							button.onClick()
						}}
						variant={isActive ? 'default' : 'outline'}
						size={'sm'}
						className={cn(
							'rounded-none flex-1',
							isFirstElement && 'rounded-l-full',
							isLastElement && 'rounded-r-full'
						)}
					>
						{button.label}
					</Button>
				)
			})}
		</div>
	)
}

export default ButtonGroup
