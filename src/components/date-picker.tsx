import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Matcher } from 'react-day-picker'
import { useState } from 'react'
interface DatePickerProps {
	value: Date | undefined
	onChange: (date: Date | undefined) => void
	disabledDates?: Matcher | Matcher[] | undefined
	text: string
}
const DatePicker = ({
	value,
	onChange,
	disabledDates,
	text,
}: DatePickerProps) => {
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
	return (
		<Popover
			open={isDatePickerOpen}
			onOpenChange={setIsDatePickerOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[200px] pl-3 text-left font-normal',
						!value && 'text-muted-foreground'
					)}
				>
					{value ? (
						format(value, 'PPP', {
							locale: tr,
						})
					) : (
						<span>{text}</span>
					)}
					<CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-auto p-0'
				align='start'
			>
				<Calendar
					locale={tr}
					mode='single'
					selected={value}
					onSelect={(value) => {
						onChange(value)
						setIsDatePickerOpen(false)
					}}
					disabled={disabledDates}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

export default DatePicker
