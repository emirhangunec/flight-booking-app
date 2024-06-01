import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from './ui/scroll-area'
import { Dispatch, SetStateAction, useState } from 'react'

interface ComboboxProps {
	items: ComboboxItem[]
	text: string
	value: string
	setValue: Dispatch<SetStateAction<string>>
}

export function ComboboxWithSearch({
	items,
	text,
	value,
	setValue,
}: ComboboxProps) {
	const [open, setOpen] = useState(false)

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'
				>
					{value
						? items.find((item) => item.value === value.toUpperCase())?.label
						: `${text} Seçiniz`}
					<ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side='top'
				className='w-[200px]  p-0'
			>
				<Command>
					<CommandInput placeholder={`${text} Arayın...`} />
					<CommandEmpty>{`${text} Bulunamadı.`}</CommandEmpty>
					<CommandGroup>
						<ScrollArea className='h-[200px]'>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									// combine the value and label with a comma because the search input will be used to search both the value and the label
									value={`${item.value},${item.label}`}
									onSelect={(currentValue) => {
										const [id] = currentValue.split(',')
										setValue(id === value ? '' : id.toUpperCase())
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === item.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{item.label} ({item.value})
								</CommandItem>
							))}
						</ScrollArea>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
