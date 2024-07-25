import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FlightFormInterface } from '../models/flighForm.model';
declare var require: any;
@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  flightSearchData!: FlightFormInterface;
  constructor() {}

  getFlights(searchCriteria: any): Observable<any[]> {
    const flights = require('../../../assets/json/flights-search.json');
    return of(flights);
  }
}
