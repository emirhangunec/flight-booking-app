import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDateFromString(dateString: string, formatString: string) {
	return format(new Date(dateString), formatString, { locale: tr })
}
