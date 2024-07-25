export interface FlightsInterface {
  airline: string;
  airlineCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  departure: string;
  arrival: string;
  seatsLeft: number;
  logo?: string;
  prices: {
    economy: number;
    business: number;
    first: number;
  };
}
