import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FlightSearchComponent } from './flight-search.component';
import { of } from 'rxjs';
import { FlightsService } from '../../../../../shared/services/flights.service';
import { FlightFormInterface } from '../../../../../shared/models/flighForm.model';

fdescribe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  let mockActivatedRoute: any;
  let mockFlightService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        queryParams: {
          departure: 'Delhi',
          destination: 'Mumbai',
          departureDate: '2021-12-12',
        },
      },
    };

    mockFlightService = {
      getFlights: jasmine.createSpy('getFlights').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      declarations: [FlightSearchComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: FlightsService, useValue: mockFlightService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFlightDetails on ngOnInit', () => {
    expect(mockFlightService.getFlights).toHaveBeenCalled();
  });

  it('should assign logos to flights', () => {
    const airlineLogos = {
      'Ethiopian airlines': 'assets/icons/ethopian.png',
      'British airlines': 'assets/icons/british-airways.png',
      'Qatar Airways': 'assets/icons/qatar-airways.jpg',
      'Indigo airlines': 'assets/icons/indigo.png',
    };
    component.flights = [
      {
        airline: 'Ethiopian airlines',
        airlineCode: 'ETH',
        departureTime: '10:00 AM',
        arrivalTime: '12:00 PM',
        duration: '2 hours',
        stops: '0',
        departure: 'Delhi',
        arrival: 'Mumbai',
        seatsLeft: 100,
        prices: { economy: 100, business: 200, first: 300 },
      },
      {
        airline: 'British airlines',
        airlineCode: 'BA',
        departureTime: '11:00 AM',
        arrivalTime: '1:00 PM',
        duration: '2 hours',
        stops: '0',
        departure: 'Delhi',
        arrival: 'Mumbai',
        seatsLeft: 100,
        prices: { economy: 100, business: 200, first: 300 },
      },
      {
        airline: 'Qatar Airways',
        airlineCode: 'QA',
        departureTime: '12:00 PM',
        arrivalTime: '2:00 PM',
        duration: '2 hours',
        stops: '0',
        departure: 'Delhi',
        arrival: 'Mumbai',
        seatsLeft: 100,
        prices: { economy: 100, business: 200, first: 300 },
      },
      {
        airline: 'Indigo airlines',
        airlineCode: 'IND',
        departureTime: '1:00 PM',
        arrivalTime: '3:00 PM',
        duration: '2 hours',
        stops: '0',
        departure: 'Delhi',
        arrival: 'Mumbai',
        seatsLeft: 100,
        prices: { economy: 100, business: 200, first: 300 },
      },
    ];
    component.assignLogos();
    expect(component.flights[0].logo).toBe(airlineLogos['Ethiopian airlines']);
    expect(component.flights[1].logo).toBe(airlineLogos['British airlines']);
    expect(component.flights[2].logo).toBe(airlineLogos['Qatar Airways']);
    expect(component.flights[3].logo).toBe(airlineLogos['Indigo airlines']);
  });

  it('should test getFlightDetails', () => {
    const flightForm: FlightFormInterface = {
      departure: 'Delhi',
      destination: 'Mumbai',
      departureDate: '2021-12-12',
      returnDate: '',
      travellers: 0,
      class: '',
    };
    component.getFlightDetails(flightForm);
    expect(mockFlightService.getFlights).toHaveBeenCalledWith(flightForm);
  });

  it('should test sortFlights', () => {
    component.filteredFlights = [
      {
        airline: 'Ethiopian airlines',
        airlineCode: 'ETH',
        departureTime: '10:00 AM',
        arrivalTime: '12:00 PM',
        duration: '2 hours',
        stops: '0',
        departure: 'Delhi',
        arrival: 'Mumbai',
        seatsLeft: 100,
        prices: { economy: 100, business: 200, first: 300 },
      },
      {
        airline: 'British airlines',
        airlineCode: 'BA',
        departureTime: '11:00 AM',
        arrivalTime: '1:00 PM',
        duration: '2 hours',
        stops: '0',
        departure: 'Delhi',
        arrival: 'Mumbai',
        seatsLeft: 100,
        prices: { economy: 100, business: 200, first: 300 },
      },
      {
        airline: 'Qatar Airways',
        airlineCode: 'QA',
        departureTime: '12:00 PM',
        arrivalTime: '2:00 PM',
        duration: '2 hours',
        stops: '0',
        departure: 'Delhi',
        arrival: 'Mumbai',
        seatsLeft: 100,
        prices: { economy: 100, business: 200, first: 300 },
      },
      {
        airline: 'Indigo airlines',
        airlineCode: 'IND',
        departureTime: '1:00 PM',
        arrivalTime: '3:00 PM',
        duration: '2 hours',
        stops: '0',
        departure: 'Delhi',
        arrival: 'Mumbai',
        seatsLeft: 100,
        prices: { economy: 100, business: 200, first: 300 },
      },
    ];
    component.sortOption = 'airlineAToZ';
    component.sortFlights();
    expect(component.filteredFlights[0].airline).toBe('British airlines');
    expect(component.filteredFlights[1].airline).toBe('Ethiopian airlines');
    expect(component.filteredFlights[2].airline).toBe('Indigo airlines');
    expect(component.filteredFlights[3].airline).toBe('Qatar Airways');
  });
});
