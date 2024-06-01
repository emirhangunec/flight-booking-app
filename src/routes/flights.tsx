import FlightPage from '@/pages/flight-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/flights')({
	component: FlightPage,
})
