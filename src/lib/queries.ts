import {
	isFlightDetailsPageSearchParamsSatisfied,
	isFlightPageSearchParamsSatisfied,
} from './flights-helper'

const BASE_API_URL = 'https://mock-flight-data-60c1d26d3fd9.herokuapp.com'

export const getAirports = async (): Promise<Airport[]> => {
	const response = await fetch(`${BASE_API_URL}/airports/all`)
	if (!response.ok) throw new Error('Network response was not ok')
	return response.json()
}

export const getOneWayFlights = async (
	params: GetFlightQueryParams
): Promise<Flight[]> => {
	const response = await fetch(
		`${BASE_API_URL}/flights?origin=${params.origin}&destination=${params.destination}&date=${params.date}`
	)
	if (!response.ok) throw new Error('Network response was not ok')
	return response.json()
}

export const getFlights = async (params: FlightPageSearchParams) => {
	if (!isFlightPageSearchParamsSatisfied(params))
		throw new Error('Invalid params')

	const outboundFlights = (await getOneWayFlights(params)) ?? []

	const inboundFlights = params.returnDate
		? await getOneWayFlights({
				origin: params.destination,
				destination: params.origin,
				date: params.returnDate,
			})
		: []

	return {
		outboundFlights,
		inboundFlights,
	}
}
export const getOneWayFlightByFlightNumber = async (
	flightNumber: string,
	date: string
): Promise<Flight> => {
	const response = await fetch(
		`${BASE_API_URL}/flights?date=${date}&flightNumber=${flightNumber}`
	)
	if (!response.ok) throw new Error('Network response was not ok')
	const flights: Flight[] = await response.json()
	return flights[0]
}

export const getFlightByFlightNumber = async (
	params: FlightDetailsPageParams
): Promise<{
	outboundFlight: Flight
	inboundFlight?: Flight
}> => {
	if (!isFlightDetailsPageSearchParamsSatisfied(params))
		throw new Error('Invalid params')
	const isRoundTrip = !!params.returnDate && !!params.inboundFlightNumber
	const outboundFlight = await getOneWayFlightByFlightNumber(
		params.outboundFlightNumber,
		params.date
	)
	const inboundFlight = isRoundTrip
		? await getOneWayFlightByFlightNumber(
				params.inboundFlightNumber!,
				params.returnDate!
			)
		: undefined

	return {
		outboundFlight,
		inboundFlight,
	}
}
