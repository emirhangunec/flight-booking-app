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

interface ComboboxItem {
	value: string
	label: string
}

interface FlightPageSearchParams {
	origin: string
	destination: string
	date: string
	isRoundTrip: string
	returnDate: string
}

interface GetFlightQueryParams
	extends Omit<Omit<FlightPageSearchParams, 'returnDate'>, 'isRoundTrip'> {}

interface Flight {
	flightNumber: string
	origin: Airport
	destination: Airport
	distance: number
	duration: Duration
	departureTime: string
	arrivalTime: string
	aircraft: Aircraft
}

interface Duration {
	locale: string
	hours: number
	minutes: number
}

interface Aircraft {
	model: string
	passengerCapacity: PassengerCapacity
	speed: number
}

interface PassengerCapacity {
	total: number
	main: number
	first: number
}

interface FlightDetailsPageParams {
	date: string
	outboundFlightNumber: string
	returnDate?: string
	inboundFlightNumber?: string
}

interface Passenger {
	firstName: string
	lastName: string
	tckn: string
	id: string
}

interface TicketData {
	flights: {
		outboundFlight: Flight
		inboundFlight?: Flight
	}
	passengers: Passenger[]
}

interface Hotel {
	id: number
	name: string
	image: string
	description: string
	rating: number
	price: number
}
