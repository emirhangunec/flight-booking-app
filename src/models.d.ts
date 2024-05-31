interface Location {
	latitude: number
	longitude: number
}

interface Airport {
	code: string
	city: string
	timezone: string
	location: Location
}
