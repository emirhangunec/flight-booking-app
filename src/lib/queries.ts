const BASE_API_URL = 'https://mock-flight-data-60c1d26d3fd9.herokuapp.com'

export const getAirports = async (): Promise<Airport[]> => {
	const response = await fetch(`${BASE_API_URL}/airports/all`)
	if (!response.ok) throw new Error('Network response was not ok')
	return response.json()
}

export const getAirport = async (code: string): Promise<Airport> => {
	const response = await fetch(`${BASE_API_URL}/airports?code=${code}`)
	if (!response.ok) throw new Error('Network response was not ok')
	return response.json()
}
