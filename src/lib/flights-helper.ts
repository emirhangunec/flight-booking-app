export function isFlightPageSearchParamsSatisfied(
	params: unknown
): params is FlightPageSearchParams {
	try {
		const validParams = params as FlightPageSearchParams

		return (
			typeof params === 'object' &&
			typeof validParams.origin === 'string' &&
			typeof validParams.destination === 'string' &&
			typeof validParams.date === 'string' &&
			typeof validParams.isRoundTrip === 'string'
		)
	} catch (error) {
		return false
	}
}
export function isFlightDetailsPageSearchParamsSatisfied(
	params: unknown
): params is FlightDetailsPageParams {
	try {
		const validParams = params as FlightDetailsPageParams

		return (
			typeof params === 'object' &&
			typeof validParams.date === 'string' &&
			typeof validParams.outboundFlightNumber === 'string'
		)
	} catch (error) {
		return false
	}
}
