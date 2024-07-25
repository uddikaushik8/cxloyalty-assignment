import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FlightsService } from '../../../../../shared/services/flights.service';
import { FlightsInterface } from '../../../../../shared/models/flightRes.model';
import { FlightFormInterface } from '../../../../../shared/models/flighForm.model';
import { SharedUtils } from '../../../../../shared/utils/shared.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss',
})
export class FlightSearchComponent implements OnInit, OnDestroy {
  flights: FlightsInterface[] = [];
  filteredFlights: FlightsInterface[] = [];
  isSortDialogOpen = false;
  isFilterDialogOpen = false;
  sortOption: string = '';
  priceRange: number = 500;
  economyClass: boolean = false;
  firstClass: boolean = false;
  businessClass: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightsService
  ) {}

  ngOnInit(): void {
    const searchCriteria = this.route.snapshot.queryParams;
    this.flightService.flightSearchData = searchCriteria as FlightFormInterface;
    this.getFlightDetails(searchCriteria);
  }

  getFlightDetails(searchCriteria: Params): void {
    const flightSub: Subscription = this.flightService
      .getFlights(searchCriteria)
      .subscribe((data: FlightsInterface[]) => {
        this.flights = data;
        this.assignLogos();
        this.filteredFlights = [...this.flights];
      });
    this.subs.push(flightSub);
  }

  assignLogos(): void {
    const airlineLogos: { [key: string]: string } = {
      'Ethiopian airlines': 'assets/icons/ethopian.png',
      'British airlines': 'assets/icons/british-airways.png',
      'Qatar Airways': 'assets/icons/qatar-airways.jpg',
      'Indigo airlines': 'assets/icons/indigo.png',
    };

    this.flights = this.flights.map((flight) => ({
      ...flight,
      logo: airlineLogos[flight.airline],
    }));
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  openSortDialog(): void {
    this.isSortDialogOpen = true;
  }

  closeSortDialog(): void {
    this.isSortDialogOpen = false;
  }

  setSortOption(option: string): void {
    this.sortOption = option;
    this.sortFlights();
  }

  sortFlights(): void {
    this.filteredFlights.sort((a, b) => {
      switch (this.sortOption) {
        case 'priceLowHigh':
          return a.prices.economy - b.prices.economy;
        case 'priceHighLow':
          return b.prices.economy - a.prices.economy;
        case 'durationShortLong':
          return (
            SharedUtils.getDurationInMinutes(a.duration) -
            SharedUtils.getDurationInMinutes(b.duration)
          );
        case 'durationLongShort':
          return (
            SharedUtils.getDurationInMinutes(b.duration) -
            SharedUtils.getDurationInMinutes(a.duration)
          );
        case 'departureEarlyLate':
          return (
            SharedUtils.convertTo24Hour(a.departureTime) -
            SharedUtils.convertTo24Hour(b.departureTime)
          );
        case 'arrivalEarlyLate':
          return (
            SharedUtils.convertTo24Hour(a.arrivalTime) -
            SharedUtils.convertTo24Hour(b.arrivalTime)
          );
        case 'airlineAToZ':
          return a.airline.localeCompare(b.airline);
        case 'airlineZToA':
          return b.airline.localeCompare(a.airline);
        default:
          return 0;
      }
    });
  }

  openFilterDialog(): void {
    this.isFilterDialogOpen = true;
  }

  closeFilterDialog(): void {
    this.isFilterDialogOpen = false;
  }

  applyFilter(): void {
    this.filteredFlights = this.flights.filter((flight) => {
      const price = this.economyClass
        ? flight.prices.economy
        : this.businessClass
        ? flight.prices.business
        : this.firstClass
        ? flight.prices.first
        : 0;
      return price <= this.priceRange;
    });
    this.isFilterDialogOpen = false;
  }

  resetFilter(): void {
    this.priceRange = 500;
    this.economyClass = false;
    this.firstClass = false;
    this.businessClass = false;
    this.filteredFlights = [...this.flights];
  }

  ngOnDestroy(): void {
    if (this.subs && this.subs.length) {
      this.subs.forEach((item: Subscription) => {
        item.unsubscribe();
      });
    }
  }
}
