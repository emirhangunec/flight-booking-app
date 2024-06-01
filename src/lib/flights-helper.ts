export function isParamsSatisfied(
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
