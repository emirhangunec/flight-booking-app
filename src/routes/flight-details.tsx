import FlightDetailsPage from '@/pages/flight-details-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/flight-details')({
	component: FlightDetailsPage,
})
