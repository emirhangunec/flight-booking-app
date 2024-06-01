import { isParamsSatisfied } from './flights-helper'

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
	if (!isParamsSatisfied(params)) throw new Error('Invalid params')

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
