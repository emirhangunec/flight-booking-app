/**
 * Excludes an airport from the given array of airports based on the provided airport code.
 * @param airports - The array of airports.
 * @param airportCodeForRemove - The airport code to be excluded.
 * @returns An array of airports excluding the specified airport.
 */
export const excludeAirport = (
	airports: Airport[],
	airportCodeForRemove: string
) => airports.filter((airport) => airport.code !== airportCodeForRemove)

/**
 * Maps an array of airports to an array of combobox items.
 * @param airports - The array of airports to map.
 * @returns An array of combobox items.
 */
export const mapAirportsToComboboxItems = (
	airports: Airport[]
): IComboboxItem[] =>
	airports.map((airport) => ({
		value: airport.code,
		label: airport.city,
	}))
